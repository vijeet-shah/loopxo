// lib/github.ts
import { Octokit } from '@octokit/rest';

// Initialize GitHub client with your token
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

// Configuration
const config = {
  owner: process.env.GITHUB_REPO_OWNER || '',
  repo: process.env.GITHUB_REPO_NAME || '',
  baseBranch: process.env.GITHUB_BASE_BRANCH || 'main',
  contentPath: 'blog',
  buildHookUrl: process.env.VERCEL_DEPLOY_HOOK_URL || '',
};

/**
 * Commit a file to GitHub
 */
export async function commitFile(
  path: string, 
  content: string, 
  message: string,
  branch: string = config.baseBranch
) {
  try {
    // First check if file exists to get its SHA (for update)
    let fileSha: string | undefined;
    
    try {
      const { data } = await octokit.repos.getContent({
        owner: config.owner,
        repo: config.repo,
        path,
        ref: branch,
      });
      
      if (!Array.isArray(data)) {
        fileSha = data.sha;
      }
    } catch (error) {
      // File doesn't exist, which is fine for creation
      console.log(`File doesn't exist yet: ${path}, ${error}`);
    }
    
    // Create or update the file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: config.owner,
      repo: config.repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
      sha: fileSha,
    });
    
    return {
      success: true,
      sha: response.data.content?.sha,
      url: response.data.content?.html_url,
    };
  } catch (error) {
    console.error('Error committing to GitHub:', error);
    throw error;
  }
}

/**
 * Create a pull request for changes
 */
export async function createPullRequest(
  branch: string,
  title: string,
  body: string
) {
  try {
    const { data } = await octokit.pulls.create({
      owner: config.owner,
      repo: config.repo,
      title,
      body,
      head: branch,
      base: config.baseBranch,
    });
    
    return {
      success: true,
      number: data.number,
      url: data.html_url,
    };
  } catch (error) {
    console.error('Error creating pull request:', error);
    throw error;
  }
}

/**
 * Create a new branch based on the main branch
 */
export async function createBranch(branchName: string) {
  try {
    // Get the latest commit on the base branch
    const { data: refData } = await octokit.git.getRef({
      owner: config.owner,
      repo: config.repo,
      ref: `heads/${config.baseBranch}`,
    });
    
    // Create a new branch from this ref
    await octokit.git.createRef({
      owner: config.owner,
      repo: config.repo,
      ref: `refs/heads/${branchName}`,
      sha: refData.object.sha,
    });
    
    return {
      success: true,
      name: branchName,
      baseSha: refData.object.sha,
    };
  } catch (error) {
    console.error('Error creating branch:', error);
    throw error;
  }
}

/**
 * Trigger a build webhook (e.g., Vercel deployment)
 */
export async function triggerBuild() {
  if (!config.buildHookUrl) {
    throw new Error('No build hook URL configured');
  }
  
  try {
    const response = await fetch(config.buildHookUrl, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to trigger build: ${response.statusText}`);
    }
    
    return {
      success: true,
      message: 'Build triggered successfully',
    };
  } catch (error) {
    console.error('Error triggering build:', error);
    throw error;
  }
}

/**
 * Complete GitHub integration flow for publishing a post
 */
export async function publishPostToGitHub(
  postId: string,
  files: Array<{ path: string, content: string }>
) {
  try {
    // Create a feature branch for this post
    const branchName = `post-${postId}-${Date.now()}`;
    await createBranch(branchName);
    
    // Commit each file to the branch
    for (const file of files) {
      await commitFile(
        file.path,
        file.content,
        `Add/update post: ${file.path}`,
        branchName
      );
    }
    
    // Create a pull request
    const pr = await createPullRequest(
      branchName,
      `Blog post update: ${postId}`,
      `This PR adds or updates blog post content for post ID: ${postId}`
    );
    
    // Trigger a build
    await triggerBuild();
    
    return {
      success: true,
      pullRequest: pr,
      branch: branchName,
    };
  } catch (error) {
    console.error('Error in GitHub publishing flow:', error);
    throw error;
  }
}