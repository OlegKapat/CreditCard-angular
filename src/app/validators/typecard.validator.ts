import { FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export class TypeCard{
  static termValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean} | null => {
      var nowDate=moment()
      var currentDay=moment().get('date')
      // var currentDate=moment(nowDate).format('MM/YYYY');
       var carddate=control.value
      // const[currentmonth,currentyear]=currentDate.split('/');
       const[cardmonth,cardyear]=carddate.split('/');
      var day = new Date(cardyear, cardmonth-1, currentDay);
      const card= moment(day)
        if ( nowDate > card) {
              return { 'term': true };
        }
        return null;
    };
}
}


