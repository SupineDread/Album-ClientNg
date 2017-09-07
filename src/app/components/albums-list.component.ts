import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  selector: 'albums-list',
  templateUrl: '../views/albums-list.html',
  providers: [AlbumService]
})

export class AlbumsListComponent implements OnInit{
  public titulo: string;
  public albums: Album[];
  public errorMessage: any;
  public loading: boolean;
  public confirmado;

  constructor(private _route: ActivatedRoute, private _router: Router, private albumService: AlbumService){
    this.titulo = 'Listado de albums:';
  }

  ngOnInit(){
    console.log('albums-lis.component.ts cargado');
    this.getAlbums();
  }

  getAlbums(){
    this.loading = true;
    this.albumService.getAlbums().subscribe(
      result=>{
        this.albums = result.albums;
        if(!this.albums){
          alert('Error en el servidor');
        }
        this.loading = false;
      }, error =>{
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
        }
      }
    );
  }

  onDeleteConfirm(id){
    this.confirmado = id;
  }

  onCancelAlbum(){
    this.confirmado= null;
  }

  onDeleteAlbum(id){
    this.albumService.deleteAlbum(id).subscribe(
      result =>{
        if(!result.album){
          alert('Error en el servidor');
        }
        this.getAlbums();
      }, error=>{
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
        }
      }
    );
  }
}
