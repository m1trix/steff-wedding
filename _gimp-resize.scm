(define (resize-image-inner file width)
  (let* ((image    (car (gimp-file-load RUN-NONINTERACTIVE file "")))
         (drawable (car (gimp-image-active-drawable image)))
         (original-w (car (gimp-image-width image)))
         (original-h (car (gimp-image-height image)))
         (height (* width (/ original-h original-w)))
         (output (string-append file "-" width)))
     (gimp-image-scale image width height)
     (gimp-file-save RUN-NONINTERACTIVE image drawable output "")))

(define (resize-image file)
  (resize-image-inner file 640)
  (resize-image-inner file 1280)
  (resize-image-inner file 1920)
  (gimp-quit 0))