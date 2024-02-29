import React from 'react'

export const RowColour = (colour, index) => {
    let string;
    if(colour=="dark"){
        if(index%2==0){
            string="bg-richblack-900"
        }
        else{
            string="bg-gray-800"
        }
        
    }
    else{
        if(index%2==0){
            string="bg-white"
        }
        else{
            string="bg-gray-200"
        }
    }
  return string;
}
