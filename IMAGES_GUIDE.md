# How to Add Product Images to Vibe-well

## Quick Start Guide

### **Step 1: Create Images Folder**
1. Go to your repository: https://github.com/sarthaksextoyswebsite/Vibe-well
2. Click **"Add file"** → **"Create new file"**
3. Type in the path: `images/.gitkeep`
4. Commit the file (this creates the images folder)

### **Step 2: Upload Product Images**
Upload these 6 product images to the `images/` folder:

| Filename | Size | Product |
|----------|------|---------|
| product1.jpg | 400x400px | Premium Vibration Massager ($49.99) |
| product2.jpg | 400x400px | Luxury Wand Massager ($79.99) |
| product3.jpg | 400x400px | Travel Massager ($39.99) |
| product4.jpg | 400x400px | Premium Couples Set ($119.99) |
| product5.jpg | 400x400px | Deluxe Accessory Kit ($29.99) |
| product6.jpg | 400x400px | Ultra-Luxury Collection ($149.99) |
| placeholder.jpg | 400x400px | Fallback image |

### **Step 3: Image Upload Instructions**

**Via GitHub Web Interface:**
1. Go to your Vibe-well repository
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop your images into the upload area
4. Make sure to place them in the `images/` folder
5. Click **"Commit changes"**

### **Step 4: Where to Get Product Images**

You can use:
- **Free Stock Photos**: Unsplash, Pexels, Pixabay
- **AI Generated**: DALL-E, Midjourney (for product mockups)
- **Existing Product Photos**: From suppliers or manufacturers
- **Design Tools**: Canva (create product mockups)

## Recommended Image Sources

### Free Stock Photo Websites
- **Unsplash** (https://unsplash.com) - Search "massager", "wellness", "product"
- **Pexels** (https://pexels.com) - High-quality photos
- **Pixabay** (https://pixabay.com) - Diverse collection

### AI Image Generators (Free trials)
- **DALL-E** - Text to image generation
- **Midjourney** - Professional product mockups
- **Stable Diffusion** - Free open-source

### Product Images from Suppliers
- Search AliExpress, Amazon, DHgate for product photos
- Get direct from manufacturers/distributors
- Request product images from suppliers

## Image Format Guidelines

### Best Practices:
✅ JPG or PNG format  
✅ 400x400px minimum for product cards  
✅ High quality (100+ KB per image)  
✅ Well-lit product photos  
✅ Consistent sizing  
✅ White or neutral background recommended  

### File Naming:
✅ `product1.jpg` (not `product_1_nice.jpg`)  
✅ Lowercase filenames  
✅ No spaces in filenames  
✅ Use hyphens for multi-word names  

## Troubleshooting

### Images Not Showing?
1. Check filename matches exactly (case-sensitive)
2. Verify image is in `images/` folder
3. Check image format is JPG or PNG
4. Browser cache - clear and refresh

### Image Sizes Off?
- Edit images to exactly 400x400px
- Use image editor: Photoshop, GIMP, or online tools
- Compress images: TinyPNG, ImageOptim

### Upload Failed?
- File size too large? Compress first
- Try uploading one image at a time
- Use GitHub's file upload instead of drag-drop

## Current Fallback Behavior

If images aren't found, the website displays a placeholder image:
```
onerror="this.src='images/placeholder.jpg'"
```

This means your site will still work even without images during development!

## Testing Images Locally

1. Download repository
2. Create `images/` folder locally
3. Add your images
4. Open `index.html` in browser
5. Test all pages load correctly
6. Push to GitHub when ready

## Next Steps

1. **Decide on image source** (free stock, AI generated, or your own)
2. **Download or create 7 images** (6 products + 1 placeholder)
3. **Resize to 400x400px** if needed
4. **Upload to GitHub** in the `images/` folder
5. **Test website** - all product images should appear

## Support Resources

- **GitHub Upload Help**: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- **Image Optimization**: https://tinypng.com
- **Image Editor**: https://pixlr.com (free online editor)
- **Mock-up Generator**: https://placeit.net

---

**Ready to add images?** Start with uploading your product images to the `images/` folder in your repository!

Questions? Let me know which method you'd like to use and I can help guide you through it step-by-step.
