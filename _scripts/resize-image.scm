(define (sw-resize-image-inner file width)
  (let* ((image    (car (gimp-file-load RUN-NONINTERACTIVE file "")))
         (drawable (car (gimp-image-active-drawable image)))
         (original-w (car (gimp-image-width image)))
         (original-h (car (gimp-image-height image)))
         (height (* width (/ original-h original-w)))
         (output (string-append
                    (substring file 0 (- (string-length file) 4))
                    "-"
                    (number->string width)
                    ".JPG")))
     (gimp-image-scale image width height)
     (gimp-file-save RUN-NONINTERACTIVE image drawable output "")))

(define (sw-resize-image file)
  (sw-resize-image-inner file 640)
  (sw-resize-image-inner file 1280)
  (sw-resize-image-inner file 1920)
  (gimp-quit 0))