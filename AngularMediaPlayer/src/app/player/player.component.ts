import { Component, OnInit,Input, Output,ViewChild,
  OnChanges, SimpleChanges,ElementRef,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input('masterPl') playlistSong:string = "././assets/videos/sample_1.mp4";  
  @ViewChild('videoPlayer') videoplayer: any;
  @Output() progressEmitter: EventEmitter<any> = new EventEmitter<any>();
  progressBarPercentage:number;
  constructor() {
       
   }
  ngOnInit() {
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   debugger;
  //   this.videoplayer.nativeElement.addEventListener('timeupdate', this.updateProgressBar.bind(this), false);
  //   if(changes.playlistSong && !changes.playlistSong.isFirstChange()) {           
  //     this.videoplayer.nativeElement.src=
  //     changes.playlistSong.currentValue;
  //     this.videoplayer.nativeElement.play();      
  //   }   
  // }
  replayVideo(mediaFile:string){
    debugger;
     this.videoplayer.nativeElement.src=mediaFile;
      this.videoplayer.nativeElement.play(); 
  }
  updateProgressBar(videoPlayer:any){
    //debugger;
      var percentage = Math.floor((100 / videoPlayer.currentTarget.duration) * videoPlayer.currentTarget.currentTime);
      percentage=isNaN(percentage)?0:percentage;   
      this.progressEmitter.emit(percentage);      
  }  
  playMedia(playSrc:string){
    debugger;
    this.videoplayer.nativeElement.addEventListener('timeupdate', this.updateProgressBar.bind(this), false);
    this.videoplayer.nativeElement.src=playSrc;
    this.videoplayer.nativeElement.play(); 
  }
  playPausedMedia(){
    debugger;
    this.videoplayer.nativeElement.play();
  }
  pauseMedia(){
    debugger;
    this.videoplayer.nativeElement.pause();
  }
  stopMedia(){
    debugger;
    this.videoplayer.nativeElement.pause();
    this.videoplayer.nativeElement.currentTime=0;
  }
  changeVolume(direction:string){
    debugger;
    if (direction === '+'){
      this.videoplayer.nativeElement.volume += this.videoplayer.nativeElement.volume== 1 ? 0 : 0.1;
    } 
    else{
      this.videoplayer.nativeElement.volume -= this.videoplayer.nativeElement.volume== 0 ? 0 : 0.1;
    }
	  this.videoplayer.nativeElement.volume = parseFloat(this.videoplayer.nativeElement.volume).toFixed(1);
  }
  toogleMute(mute:boolean){
    debugger;
    if (this.videoplayer.nativeElement.muted) {		
		  this.videoplayer.nativeElement.muted = false;
	}
	else {		
		  this.videoplayer.nativeElement.muted = true;
	  }
  }
}

