import { Component, OnInit } from '@angular/core';
import { WaniKaniService } from 'src/app/Services/wani-kani.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  apiUrl: string = environment.apiUrl;

  constructor(private waniKaniService: WaniKaniService) { }

  ngOnInit(): void { }

  onGetSubjects() {
    this.waniKaniService.getSubjects();
  }
}
