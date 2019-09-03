import { Component, OnInit,Input,SimpleChanges,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataService} from '../shared/data.service';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  debugger;
  playList:any;
  @Output() playlistChangeEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient,private dataService:DataService) {     
  }
  ngOnInit() {
    debugger;
    this.dataService.currentMessage.subscribe(currentData=>{
      this.playList=currentData;
      if(this.playList!=null && this.playList.length>0){
        this.playlistChangeEmitter.emit(this.playList[0]);
     }
    });    
  } 
  playListChanged(playObj:any){
    debugger;
    this.playlistChangeEmitter.emit(playObj);
  }
}

