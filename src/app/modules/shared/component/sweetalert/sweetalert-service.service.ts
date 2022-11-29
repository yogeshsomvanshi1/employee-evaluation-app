import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/**
 * FIXME: 
 * - Firstly this is not following the camel case naming convention.
 * - Secondly why not only AlertService.
 * - Thirdly why ...ServiceService
 * - and lastly why even use a library for things which angular bootstrap 
 *   already provides we just need to create a service which is not a 
 *   priority right now as discussed so leaving it as is
 */
@Injectable()
export class SweetalertServiceService {

  constructor(private router: Router) { }

  // Password Updated
  PasswordUpdateURL(path: any) {
    Swal.fire({
      title: 'Success', 
      text: 'Password Updated',
      icon: 'success',
      confirmButtonText: 'OK',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }).then(() => {
      this.router.navigate([path]); // navigate to other page
    })
  }

  // User created
  UserCreatedURL(path: any) {
    Swal.fire({
      title: 'Success',
      text: 'User created successfully ',
      icon: 'success',
      confirmButtonText: 'OK',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }).then(() => {
      this.router.navigate([path]); // navigate to other page
    })
  }

  passwordChanged(path: any) {
    Swal.fire({
      title: '',
      text: 'Password changed successfully ',
      icon: 'success',
      confirmButtonText: 'OK',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }).then(() => {
      this.router.navigate([path]); // navigate to other page
    })
  }
  // Enter your email address and your password will be reset and emailed to you.
  mailcheck(path: any| null) {
    Swal.fire({
      title: '',
      text: 'Please check your Email. ',
      icon: 'success',
      confirmButtonText: 'OK',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }).then(() => {
      if(path !=null) {
        this.router.navigate([path]); // navigate to other page
      }
     
    })
  }

    SelectRecord(data) {
    Swal.fire({
      text: data,
      icon: 'warning',
      confirmButtonText: 'OK',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    })
  
  }

  // update
  RecordUpdated(path?: any) {
  Swal.fire({
    title: 'Updated',
    text: 'Your data is Updated ',
    icon: 'success',
    confirmButtonText: 'OK',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  }).then(() => {
    if (path) {
      this.router.navigate([path]); // navigate to other page
    }
  })

}

RecordUpdatedStatic() {
  Swal.fire({
    title: 'Updated',
    text: 'Your data is Updated ',
    icon: 'success',
    confirmButtonText: 'OK',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  })

}

// add
 RecordAdded(path?: any) {
  Swal.fire({
    title: 'Added',
    text: 'Record added successfully ',
    icon: 'success',
    confirmButtonText: 'OK',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  }).then(() => {
    if (path) {
      this.router.navigate([path]); // navigate to other page
    }
  })
}

// add
RecordAddedStatic() {
  Swal.fire({
    title: 'Added',
    text: 'Record added successfully ',
    icon: 'success',
    confirmButtonText: 'OK',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  })
}

roleAssigned() {
  Swal.fire({
    title: 'Assigned',
    text: 'Role Assigned Successfully',
    icon: 'success',
    confirmButtonText: 'OK',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  })
}

recordDeleted(){
  Swal.fire(
    {
      title: 'Deleted',
      text: 'Your data has been deleted ',
      icon: 'success',
      confirmButtonText: 'OK',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
    }
  )
}
ResourceDataExist() {
  Swal.fire({
    // title: 'Success',
    text: 'Resource name already registered. Please try another ',
    icon: 'warning',
    confirmButtonText: 'OK',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  })

}

returValue=true;


// FIXME: This code won't work as is and it not used anywhere we can have common delete functionality just it needs to be implemented properly
  async DeleteRecord(data1) {
  let data = {
    event: 'delete',
   data: data1
  }
await   Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete the data',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonColor: "rgb(220, 53, 69)",
    confirmButtonText: 'Yes  ',
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
  }).then(async (result) =>  {
    if (result.value) {
      
   this.returValue  =  await this.func();
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {
     await Swal.fire(

        {
          title: 'Cancelled',
          text: 'Your data is safe',
          confirmButtonText: 'OK',
          icon: 'success',
          
          showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
            icon: ''                       // disable icon animation
          },
          hideClass: {
            popup: '',                     // disable popup fade-out animation
          },
        }
      )
      this.returValue= false;
    }
  
  });
  return this.returValue;
}
  func() {
   return true;
  }

}

