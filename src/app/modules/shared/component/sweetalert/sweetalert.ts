import Swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';



// update
export function RecordUpdated() {
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
export function RecordAdded() {
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

export function CreateRole() {
  Swal.fire({
    title: 'Added',
    text: 'Role added successfully ',
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

export function PasswordUpdate() {
  Swal.fire({
    title: 'Updated',
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
    this.router.navigate(['/login']); // navigate to other page
  })
}

export function RoleAssigned() {
  Swal.fire({
    title: 'Success',
    text: 'Role Assigned successfully ',
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

export function UserCreated() {
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
  })
}

export function SelectRecord() {
  Swal.fire({
    text: 'Please select a record ',
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

export function invalidPassword() {
  Swal.fire({
    text: 'Old password is incorrect',
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



export function emailAlreadyTaken() {
  Swal.fire({
    text: 'Email already registered. Please try another',
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


