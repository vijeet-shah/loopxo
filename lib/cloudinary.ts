export async function deleteCloudinaryImage(publicId: string) {
    try {
      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }