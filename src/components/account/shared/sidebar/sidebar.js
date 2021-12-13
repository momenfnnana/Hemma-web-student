import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import "./styles.sass";
import "./index.scss";
import { bookIcon , scheduleIcon,telegramIcon,quizIcon,trainingsIcon,askMentor } from './svg-icons';

const sideBarItems = [
  {
    title: "جدول الدورة",
    icon : scheduleIcon,
    to: (id)=>`/course/content/${id}/schedule`
  },
  {
    title: "الملزمة + طلب الملزمة",
    icon : bookIcon,
    to: (id)=>`/course/content/${id}/booklets`


  },
  {
    title: "قروب التلجرام",
    icon : telegramIcon,
    to: (id)=>`/course/content/${id}/chat`

  },
  {
    title: "الاختبارات الاكترونية",
    icon : quizIcon,
    to: (id)=>`/course/content/${id}/exams/list`

  },
  {
    title: "التدريبات",
    icon : trainingsIcon,
    to: (id)=>`/course/content/${id}/training/list`

  },
  {
    title: "اسال المدرب",
    icon : askMentor,
    to: (id)=>`/course/content/${id}/askQuestions/list`

  },
];

export const SideBarItem = ({title = "لا يوجد عنوان",icon,link="/",id , to = ()=>{},history}) => (
  <li class="nav-item w-100">
    <NavLink
      to={to(id)}
      onClick={()=> history.push(to(id))}
      class="nav-link d-flex align-items-center no-style"
      activeClassName="nav-link d-flex align-items-center active"
      data-bs-toggle="tab"
      data-bs-target=""
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  </li>
);

const SideBarItems = ({id,history})=>(
  <ul className="list-unstyled p-0 m-0 nav courses-features">
    {sideBarItems.map(item =>(
      <SideBarItem {...item} id={id} history={history} />
    ))}
  </ul>
  )


  const SideBarHeader = ({ studentName = "اسم الطالب" }) => (
    <div class="card-header main-color-bg border-bottom pt-4">
      <h5 class="h5 text-white font-weight-bold text-center my-2">
        {studentName}
      </h5>
    </div>
  );

export class SidebarComponent extends Component {
  state = {
    isInstallmentOpen: false,
    details: [],
  };
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUser();
    }
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    const courseId = this.props.courseId;
    axios
      .get(`${apiBaseUrl}/content/${courseId}/remaining_payment_details`, {
        headers,
      })
      .then((response) => {
        this.setState({ details: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  openInstallmentModal = () => {
    this.setState({ isInstallmentOpen: true });
  };
  closeInstallmentModal = () => {
    this.setState({ isInstallmentOpen: false });
  };

  render() {
    const user = this.props.user;
    const channelID = this.props.chatChannelSid;
    return (
      <React.Fragment>
        <div className="sidebar courses-features  card-hover border-radius-30 border-main-color overflow-hidden mb-3">
         <SideBarHeader studentName={user?.name} />
          <div className="sidebar-list">
            <ul className="list-unstyled mb-0">
              <SideBarItems id={this.props.id} history={this.props.history} />
            </ul>
          </div>
        </div>
        <div 
          className='rate-course-btn d-flex justify-content-center align-items-center my-4' 
          onClick={()=>
            this.props.history.push(`/course/content/${this.props.id}/evaluations`)
        }>
          <h4 className="rate-course-btn-text">قيم الدورة</h4>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

SidebarComponent = connect(mapStateToProps, { getUser })(SidebarComponent);

export const Sidebar = withRouter(SidebarComponent);
