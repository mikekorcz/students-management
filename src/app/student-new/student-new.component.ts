import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';


@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

  @Input() students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  add(name: string, username: string, email: string): void {
    // Usunięcie białych znaków z danych
    name = name.trim();
    username = username.trim();
    email = email.trim();
  
    // Zaprzestanie wykonywania, kiedy pola są puste
    if (!name || !username || !email) {
      return;
    }
  
    // Zaprzestanie wykonywania, kiedy adres e-mail nie zawiera "@"
    if (email.indexOf('@') < 1) {
      return;
    }
  
    // Przesłanie danych do serwera i zaktualizowanie lokalnej tablicy
      this.studentService.addStudent({ name, username, email } as Student)
        .subscribe(student=> {
          this.students.push(student);
        });
  }

}
