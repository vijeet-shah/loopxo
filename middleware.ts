import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const {  searchParams } = request.nextUrl;
  
  // Get language from query parameter if available
  const langParam = searchParams.get('lang');
  
  if (langParam && ['en', 'hi', 'de', 'fr', 'es', 'zh'].includes(langParam)) {
    console.log("Setting language from query param:", langParam);
    
    // If there's a valid language parameter, set it as a cookie
    const response = NextResponse.next();
    response.cookies.set('language', langParam, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }
  
 
  
  // For non-admin routes, handle language detection
  const languageCookie = request.cookies.get('language');
  
  // If no language preference is set or not valid, check Accept-Language header
  if (!languageCookie || !['en', 'hi', 'de', 'fr', 'es', 'zh'].includes(languageCookie.value)) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    // Default to English
    let detectedLanguage = 'en'; 
    
    // Simple detection for supported languages
    if (acceptLanguage.includes('hi')) {
      detectedLanguage = 'hi';
    } else if (acceptLanguage.includes('de')) {
      detectedLanguage = 'de';
    } else if (acceptLanguage.includes('fr')) {
      detectedLanguage = 'fr';
    } else if (acceptLanguage.includes('es')) {
      detectedLanguage = 'es';
    } else if (acceptLanguage.includes('zh')) {
      detectedLanguage = 'zh';
    }
    
    console.log("Setting language from Accept-Language:", detectedLanguage);
    
    // Create a response with the cookie
    const response = NextResponse.next();
    response.cookies.set('language', detectedLanguage, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all paths except for static files, api routes, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};