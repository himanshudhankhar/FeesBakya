import React from "react";
import UserImage from '../userImage.png';
class Profile extends React.Component {
  render() {
    // User object destructuring
    let {
      rollnumber,
      face,
      student_name,
      fathers_name,
      gender,
      classs,
      mobileNumber,
      dob,
      village
    } = this.props.user;
if(face==undefined||face==null||face.trim().length==0){
    face="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MjQ5OTc4ODk1/chuck-norris-15720761-1-402.jpg";
}
    return (
      <div className="identityCard__profile">
        {/* <div className="identityCard__identity">
          <strong>Aadhar Number :</strong> {id}
        </div> */}
        <div className="identityCard__visual">
          <img src={face} alt="" />
        </div>
        <ul className="identityCard__list">
          <li>
            <strong>Name :</strong> {student_name.toUpperCase()}
          </li>
          {/* <li>
            <strong>Father's Name :</strong> {fathers_name.toUpperCase()}
          </li> */}
          {/* <li>
            <strong>Gender :</strong> {gender.toUpperCase()}
          </li> */}
          <li>
            <strong>class :</strong> {classs.toUpperCase()}
          </li>
          <li>
            <strong>Date of Birth :</strong> {new Date(dob).getDate() +'/'+new Date(dob).getMonth() +'/'+new Date(dob).getFullYear()}
          </li>
          <li>
            <strong>Mobile :</strong> {mobileNumber}
          </li>
          <li>
            <strong>Village :</strong> {village.toUpperCase()}
          </li>
        </ul>
      </div>
    );
  }
}

export default Profile;
