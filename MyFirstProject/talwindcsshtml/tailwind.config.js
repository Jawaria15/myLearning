/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["public/*.{html,js}"],
  theme: {
   

    extend: {
     
      colors: {
        // Configure your color palette here
         'customred':'#ff0000',
         'customgrey':'#f5f5f5',
         'customgreytext':'#999999',
         'customgreybg':'#1a1d24',
         'customgreybgtwo':' #787777'
         

         
         
        },
    fontFamily:{
      oswaldRegular:["OswaldR", "sans-serif"],
      oswaldBold:["OswaldB", "sans-serif"],
      oswaldSemiBold:["OswaldSB", "sans-serif"],
      oswaldlight:["OswaldL", "sans-serif"]
    }
  }
  },
  plugins: [],
}
