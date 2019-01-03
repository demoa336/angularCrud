import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
	  value.sort((a:any, b:any) => {

		var arg = args.replace('-', '');

		if (args.includes("-")) {
			if(isNaN(a[arg])) {
				if(a[arg] > b[arg]) {
				  return -1;
				} else if(a[arg] < b[arg]) {
				   return 1;
				} else {
				   return 0;
				}
			} else {
				return parseFloat(b[arg]) - parseFloat(a[arg])
			} 
		} else {
			if(isNaN(a[arg])) {
				if(a[arg] < b[arg]) {
				  return -1;
				} else if(a[arg] > b[arg]) {
				   return 1;
				} else {
				   return 0;
				}
			} else {
				return parseFloat(a[arg]) - parseFloat(b[arg])
			} 
		}
		
		  
	  })
	return value;
  }

}
