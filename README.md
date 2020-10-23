# SocialSite
#tasks
1) add cors to the ajax request in app.jsx(done)
2) Need to check is req authenticated before upload.single middleware in uploadimage.js 
   as even the user is not authenticate it is storing the image in th uploads folder, although, it won't store it in DB.(done)

3) Use axios call in set-username route in frontend to check whether a user already has a username or is it undefined.If he already has a username then redirect to the app page if    authenticated.ALso make the axios call synchronous.
