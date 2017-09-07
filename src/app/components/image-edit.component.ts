import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../models/image';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'image-edit',
  templateUrl: '../views/image-add.html',
  providers: [ImageService]
})

export class ImageEditComponent implements OnInit{
  public titulo: string;
  public image: Image;
  public errorMessage: any;
  public is_edit:boolean;

  constructor(private _route: ActivatedRoute, private _router: Router, private _imageService: ImageService){
    this.titulo = 'Editar imagen';
    this.is_edit = true;
  }

  ngOnInit(){
    console.log('image-edit.component.ts cargado');
    this.image = new Image("","","");
    this.getImage();
  }

  getImage(){
    this._route.params.forEach((params: Params)=>{
      let id = params['id'];
      this._imageService.getImage(id).subscribe(
        response=>{
          this.image= response.image;

          if(!response.image){
            alert('Error en el servidor');
            this._router.navigate(['/']);
          }
        }, error=>{
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        }
      );
    });
  }

  onSubmit(){
    this._route.params.forEach((params: Params)=>{
      let id = params['id'];
      this._imageService.editImage(id, this.image).subscribe(
        response=>{
          this.image= response.image;
          if(!response.image){
            alert('Error en el servidor');
          }else{
            //Subir la imagen
            if(!this.filesToUpload){
              alert('Debes seleccionar una imagen');
              console.log('No hay imagen seleccionada');
              //this._router.navigate(['/album', this.image.album]);
            }else{
              this.makeFileRequest(GLOBAL.url+'upload-image/'+id, [], this.filesToUpload).then(
                (result)=>{
                  this.resultUpload = result;
                  this.image.picture = this.resultUpload.fileName;
                  this._router.navigate(['/album', this.image.album]);
                },(error)=>{
                  console.log(error);
                });
            }
          }
        },error=>{
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
          }
        });
    });
  }

  public resultUpload;
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<String>, files: Array<File>){
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i =0; i < files.length; i++){
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
          if(xhr.status==200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
