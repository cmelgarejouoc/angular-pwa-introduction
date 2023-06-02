import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  image: Image | undefined;

  constructor(
    private imagesService: ImagesService,
    // to read parameter from url
    private activateRoute: ActivatedRoute,
    // to redirect the user of this view if we don't have a valid identifier
    private router: Router
  ) {}

  ngOnInit(): void {
    const identifier = this.activateRoute.snapshot.paramMap.get('id');

    if (identifier !== null) {
      console.log('Identifier -->', identifier);

      this.imagesService.getImageById(identifier).subscribe((image) => {
        if (!image) {
          return this.router.navigateByUrl('/');
        }

        this.image = image;
        console.log('Image -->', this.image);

        return;
      });
    }
  }
}
