(define (sw-black-and-white file)
  (let* ((image    (car (gimp-file-load RUN-NONINTERACTIVE file "")))
         (drawable (car (gimp-image-active-drawable image)))
         (output (string-append
                    (substring file 0 (- (string-length file) 4))
                    "-"
                    "bw"
                    ".JPG")))
     (gimp-image-scale image width height)
     (gimp-file-save RUN-NONINTERACTIVE image drawable output "")
     (gimp-quit 0)))
