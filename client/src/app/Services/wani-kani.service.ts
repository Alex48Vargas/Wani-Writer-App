import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, SubjectMeaning } from '../Models/subject';
import { Radical } from '../Models/radical';
import { Kanji, KanjiReading } from '../Models/kanji';
import { Vocabulary, VocabularyReading } from '../Models/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class WaniKaniService {
  waniUrl: string = environment.waniUrl;
  waniAuth: string = environment.waniAuth;
  response: string = '';
  subjects: Subject[] = [];

  constructor(private http: HttpClient) { }

  getSubjects() {
    const options = {
      params: new HttpParams().set('levels', '1'),
      headers: new HttpHeaders().set('Authorization', this.waniAuth)
    }
    this.http.get<any>(this.waniUrl + 'subjects', options).subscribe({
      next: res => {
        this.populateSubjects(res.data);
        this.subjects.forEach(subject => console.log(JSON.stringify(subject)));
      },
      error: err => console.log(err)
    })
  }

  /* ------ PRIVATE METHODS ------ */

  private populateSubjects(subs: any[]){
    subs.forEach(sub => {
      const meanings: any[] = sub.data.meanings;
      var subjectMeanings: SubjectMeaning[] = [];
      meanings.forEach(meaning => subjectMeanings.push({
        meaning: meaning.meaning,
        primary: meaning.primary
      }));

      if (sub.object == 'radical') {
        const radical: Radical = {
          id: sub.id,
          type: 'radical',
          characters: sub.data.slug,
          meanings: subjectMeanings,
          documentUrl: sub.data.document_url,
          lesson: sub.data.level,
          lessonPosition: sub.data.level_position,
          characterImages: [],
        }
        this.subjects.push(radical);
      }

      else if (sub.object == 'kanji') {
        var radicalComponents: number[] = [];
        const temp1: any[] = sub.data.component_subject_ids
        temp1.forEach(id => radicalComponents.push(id));

        var readings: KanjiReading[] = [];
        const temp2: any[] = sub.data.readings;
        temp2.forEach(reading => readings.push({
          reading: reading.reading,
          type: reading.type,
          primary: reading.primary
        }));

        const kanji: Kanji = {
          id: sub.id,
          type: 'kanji',
          characters: sub.data.slug,
          meanings: subjectMeanings,
          documentUrl: sub.data.document_url,
          lesson: sub.data.level,
          lessonPosition: sub.data.level_position,
          radicalComponents: radicalComponents,
          readings: readings
        }
        this.subjects.push(kanji);
      }

      else if (sub.object == 'vocabulary') {
        var kanjiComponents: number[] = [];
        const temp1: any[] = sub.data.component_subject_ids
        temp1.forEach(id => kanjiComponents.push(id));

        var vreadings: VocabularyReading[] = [];
        const temp2: any[] = sub.data.readings;
        temp2.forEach(reading => vreadings.push({
          reading: reading.reading,
          primary: reading.primary
        }));

        var partsOfSpeech: string[] = [];
        const temp3: any[] = sub.data.parts_of_speech;
        temp3.forEach(part => partsOfSpeech.push(part));

        const vocab: Vocabulary = {
          id: sub.id,
          type: 'vocabulary',
          characters: sub.data.slug,
          meanings: subjectMeanings,
          documentUrl: sub.data.document_url,
          lesson: sub.data.level,
          lessonPosition: sub.data.level_position,
          kanjiComponents: kanjiComponents,
          readings: vreadings,
          partsOfSpeech: partsOfSpeech,
        }
        this.subjects.push(vocab);
      }
    });
  }

}
