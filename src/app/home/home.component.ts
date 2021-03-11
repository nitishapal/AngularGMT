import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meetingForm: FormGroup;
  loading = false;
  submitted = false;
  submittedDate: any = {};
  startTime: any;
  endTime: any;
  timeZone: any;

  constructor(public translate: TranslateService,  private formBuilder: FormBuilder) {}

  ngOnInit(): void {
   this.meetingForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    meetingdate: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$')]),
    starttime: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$')]),
    endtime: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$')]),
  });
  }
  changeLanguage(value){
    this.translate.use(value);
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.meetingForm.value);
    this.startTime = (this.meetingForm.value.starttime).split(':');
    this.endTime = (this.meetingForm.value.endtime).split(':');
    if (this.startTime[0] > this.endTime[0]){
      alert('Start time should be grater than end time.');
    }
    else if (this.startTime[0] === this.endTime[0]){
      if (this.startTime[1] >= this.endTime[1]){
      alert('Start time should be grater than end time.');
      }
    }
    localStorage.setItem('userName', this.meetingForm.value.username);
    localStorage.setItem('meetingDate', this.meetingForm.value.meetingdate);
    localStorage.setItem('startTime', this.meetingForm.value.starttime);
    localStorage.setItem('endTime', this.meetingForm.value.endtime);
    this.submittedDate = this.meetingForm.value;
  }
selectTimeZone(value){
  console.log(value);
  this.timeZone = value;
}
}
