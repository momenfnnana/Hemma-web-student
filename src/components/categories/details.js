import React, { Component, useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import Slider from "react-slick";
import { Card } from "../shared/card/card";
import { PublicationDetails } from "../publication/publication";
import { apiBaseUrl } from "../../api/helpers";
import { Helmet } from "react-helmet";
import swal from "@sweetalert/with-react";
import Loader from "react-loaders";
import { Api } from "../../api";
import axios from "axios";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.sass";
import { PageLoader } from "../courses/page-loader";
import ContentLoader from "react-content-loader";
import { Category } from "emoji-mart";
import NavTab from "./tab-link";
import ProfessionalLicense, {
  ProfessionalLicenseText,
} from "./professional-license";
import { NavLink, Link, withRouter } from "react-router-dom";
import ShowAt from "../../HOC/show-at";
import { getQuery } from "../../utils/query-params";
import {SubCategories} from './subCategories/index'

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

const freeMeetingsText = 'اللقاءات المجانية'

/**
 * tab-three => free groups
 * tab-four => hemma successes
 */

const staticTabs = ['tab-three',ProfessionalLicenseText,'tab-four',freeMeetingsText]

export class _CategoryDetails extends Component {
	page = 1;
	limit = 6;
	endOfResults = false;
	SuccesesLimt = 12;
	Succesespage = 1;

	constructor(props) {
		super(props);
		this.state = {
			successes: [],
			details: [],
			page : 0,
			subcategoriesdetails: [],
			lectures: [],
			hiddenTabs: [],
			content: [],
			publications: [],
			courses: [],
			competitions: [],
			categoryGroups: [],
			hasProfessionalLicense :false,
			selectedPublicationId: null,
			modalIsOpen: false,
			hideBtn: false,
			showgroupedPackagesBtn: true,
			hideBtnSuccess: false,
			loading: false,
			disabled: false,
			active: "",
			defultActive: "show active",
			coursesShimmerLoader: true,
			lecturesShimmerLoader: true,
			categoryGroupsShimmerLoader: true,
			competitionsShimmerLoader: true,
			publicationsShimmerLoader: true,
			currentTab: 'tab-two',
			nextPageUrl: `${apiBaseUrl}/categories/${this.props.match.params.slug}/courses?Page=${this.page}&Limit=${this.limit}&featuredOnly=true`,
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.changeTab = this.changeTab.bind(this);
		this.intiReq = this.intiReq.bind(this)
		this.loadMore = this.loadMore.bind(this)
		this.resetToInintPageState = this.resetToInintPageState.bind(this)
		
	}

	openModal(id) {
		this.setState({modalIsOpen: true, selectedPublicationId: id});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	intiReq() {
		const url = `${apiBaseUrl}/categories/${this.props.match.params.slug}/courses?Page=${1}&Limit=${this.limit}&featuredOnly=true`;
		let token = localStorage.getItem("token");
		let headers = {
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(url, {headers})
			.then((response) => {
				this.setState({loading: false, disabled: false});
				const courses = response.data.data.data
				this.setState({...this.state, courses})
			})
	}

	async loadMore(){
		let token = localStorage.getItem("token");
		let headers = {
			Authorization: `Bearer ${token}`,
		};
		this.setState({loading: true, disabled: true});
		if (!this.endOfResults) {
			const {state : {page : prevPage}} = this
			const nextUrl = `${apiBaseUrl}/categories/${this.state.currentSlug || this.props.match.params.slug}/courses?Page=${prevPage+1}&Limit=${this.limit}&featuredOnly=true`;
			axios
				.get(nextUrl, {headers})
				.then((response) => {
					this.setState({loading: false, disabled: false});
					const newCourses = [
						...this.state.courses,
						...response.data.data.data,
					];
					this.endOfResults = response.data.data.itemCount < this.limit;
					this.page++;
					const noMoreCourses = newCourses.length === response.data.data.itemCount
					this.setState({
						courses: newCourses,
						coursesShimmerLoader: false,
						hasNocourses: !!!newCourses?.length,
						page : this.state.page + 1,
						noMoreCourses
					});
					if (newCourses.length == response.data.data.itemCount) {
						this.setState({hideBtn: true});
					}
				})
				.catch((error) => {
					console.log(error);
					this.setState({loading: false, disabled: false});
				}).finally(()=>{

				})
		}
	};
	moreSucces = async () => {
		const {
			match: {params},
		} = this.props;
		this.setState({loading: true});
		this.Succesespage++;
		axios
			.get(
				`${apiBaseUrl}/Success?CategoryId=${params.slug}&Limit=${this.SuccesesLimt}&Page=${this.Succesespage}`
			)
			.then((response) => {
				const newSuccess = [
					...this.state.successes,
					...response.data.data.data,
				];
				var more = false;
				if (
					response.data.itemCount >
					response.data.limit * response.data.page
				) {
					more = true;
				}
				this.setState({successes: newSuccess, hideBtnSuccess: more});
			})
			.catch((error) => {
				console.log(error);
			});
	};

  handleHasProfessionalLicense(hasProLicense) {
	this.handleNavForProLicense()
    this.setState({hasProfessionalLicense:hasProLicense });
  }

	hasProfessionalLicense(details) {
		if (!details?.professionalLicense) return;
		const {professionalLicense} = details;
		return professionalLicense
	}

	handleNavFromFree() {
		const hasFreeFlag = getQuery('free')
		if (hasFreeFlag === 'true')
			setTimeout(() => {
				this.simulateClick('tab-three')
			}, 1500);
	}
	handleNavForProLicense() {
				this.simulateClick(ProfessionalLicenseText)
	}

	async componentDidMount() {
		const {
			match: {params}
		} = this.props;

		axios
			.get(`${apiBaseUrl}/categories/${params.slug}`)
			.then((response) => {
				this.setState({details: response.data.data}, () => {
					const hasProLicense =  this.hasProfessionalLicense(response.data.data);
					this.handleHasProfessionalLicense(hasProLicense)
				});
				this.setState({
					...this.state,
					showgroupedPackagesBtn: response.data.data.groupedPackages,
				});
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(
				`${apiBaseUrl}/Success?CategoryId=${params.slug}&Limit=${this.SuccesesLimt}&Page=${this.Succesespage}`
			)
			.then((response) => {
				var more = false;
				if (
					response.data.data.itemCount >
					response.data.data.limit * response.data.data.page
				) {
					more = true;
				}
				this.setState({
					successes: response.data.data.data,
					hideBtnSuccess: more,
				});
			})
			.catch((error) => {
				console.log(error);
			});

		this.handleNavFromFree()

		axios
			.get(`${apiBaseUrl}/categories/${params.slug}/SubCategories`)
			.then((response) => {
				this.setState({
					subcategoriesdetails: response.data.data.childCatgories,
				});
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${apiBaseUrl}/FreeLectures?categoryIdOrSlug=${params.slug}`)
			.then((response) => {
				this.setState({
					lectures: response.data.data,
					lecturesShimmerLoader: false,
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({lecturesShimmerLoader: false});
			});

		axios
			.get(`${apiBaseUrl}/categories/${params.slug}/publications`)
			.then((response) => {
				this.setState({
					publications: response.data.data.data,
					publicationsShimmerLoader: false,
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({publicationsShimmerLoader: false});
			});

		Api.categories
			.getCompetitions(params.slug)
			.then((response) => {
				this.setState({
					competitions: response,
					competitionsShimmerLoader: false,
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({competitionsShimmerLoader: false});
			});

		//free groups
		axios
			.get(`${apiBaseUrl}/CategoryGroups?category=${params.slug}`)
			.then((response) => {
				this.setState({
					categoryGroups: response.data.data,
					categoryGroupsShimmerLoader: false,
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({categoryGroupsShimmerLoader: false});
			});

		await this.loadMore();
		if (this.props.history.location.hash == "#tab-three") {
			this.setState({active: "show active", defultActive: ""});
		}
	}

	warningAlert(msg) {

		swal(
			"عفواً",

			msg,

			"error",

			{

				button: "متابعة",

			}
		);

	}

	categoryGroupRedirection(CategoryGroup) {
		const {
			match: {params},
		} = this.props;
		let token = localStorage.getItem("token");
		if (token) {
			this.props.history.push(
				`/categories/details/${params.slug}/quick-questions/${CategoryGroup}`
			);
		} else {
			swal(
				"عفواً",
				"يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
				"error",
				{
					button: "متابعة",
				}
			);
		}
	}

	handleSubCategoriesChange(prevSubcategoriesdetails = [], subcategoriesdetails = []) {
		if (prevSubcategoriesdetails.length !== subcategoriesdetails?.length) {
			const [firstSubCategory] = subcategoriesdetails
			const {slug} = firstSubCategory
			if (!slug) return
			setTimeout(() => {
				this.simulateClick(slug)
			}, 200);
		}
	}

	resetToInintPageState(){
		this.setState({currentSlug:null,page : 1,noMoreCourses:false})
	}


	componentDidUpdate(prevProps, prevState) {
		const {currentTab: prevTab, subcategoriesdetails: prevSubcategoriesdetails,hasProfessionalLicense : prevHasProfessionalLicense} = prevState
		const {currentTab, subcategoriesdetails,hasProfessionalLicense} = this.state
		if (prevTab !== currentTab) {
			if (currentTab === 'tab-two') {
				this.intiReq()
				this.resetToInintPageState()
			}
		}
		if(hasProfessionalLicense && prevHasProfessionalLicense !== hasProfessionalLicense){
			// this.simulateClick(ProfessionalLicenseText)
		}
		// this.handleSubCategoriesChange(prevSubcategoriesdetails,subcategoriesdetails)
	}

	renderCategoryGroups() {
		//free groups
		return <div className="row">
			{this.state.categoryGroups.map((group) => (
				<div className="col-lg-4" key={group.id}>
					<div
						className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative min-height-150"
						onClick={() => this.categoryGroupRedirection(group.id)}
					>
						<div className="d-flex align-items-center">
							<div className="mr-4">
								<img
									src={process.env.PUBLIC_URL + "/assets/images/icon.svg"}
									className="width-80"
									alt="ICON"
								/>
							</div>
							<div className="text-white">
								<h4 className="h4">{group.name}</h4>
								<div className="font-size-18 mb-2">{group.description}</div>
								<div className="font-size-14 d-flex align-items-center">
									<div className="mr-2">
										<i className="far fa-user-circle"></i>
									</div>
									<div className="mr-2">طالب</div>
									<div>{group.numberOfMembers}</div>
								</div>
							</div>
						</div>
					</div>
				</div>))}
			</div>
	}

	renderPublications() {
		return this.state.publications.map((publication) => (
			<React.Fragment>
				<div
					className="publication-img"
					key={publication.id}
					onClick={() => this.openModal(publication.id)}
				>
					<img
						src={publication.thumbnailUrl}
						width="100%"
						alt={publication.id}
					/>
					<div className="publication-overlay">
						<img
							src={process.env.PUBLIC_URL + "/assets/images/eye.png"}
							alt={publication.id}
						/>
					</div>
				</div>
			</React.Fragment>
		));
	}

	renderEmptyText() {
		if (this.state.loading || this.state?.subcategoriesdetails?.length)
			return null

		return (
			<p className="col-12 text-center">
				انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا
			</p>
		)
	}

	renderCards() {
		if (this.state.courses.length === 0)
			return this.renderEmptyText()
		return this.state.courses.map((course) => (
			<React.Fragment>
				<div className="col-lg-4">
					<Card key={course.id} course={course}/>
				</div>
			</React.Fragment>
		));
	}

	renderCourses(courses) {
		return courses.map((course) => (
			<div className="col-lg-4">
				<Card key={course.id} course={course}/>
			</div>
		));
	}

	renderPanelSub() {
		return this.state.subcategoriesdetails.map((Category, count) => (
			<React.Fragment>
				<div className="tab-pane fade " id={"tab-" + count} role="tabpanel">
					<div className="container">
						<div className="row">{this.renderCourses(Category.courses)}</div>
					</div>
				</div>
			</React.Fragment>
		));
	}

	hasSubcategoriesReq(slug) {
		return axios.get(`${apiBaseUrl}/categories/${slug}/SubCategories`)
	}

	async validateHasSubCategories(slug) {
		try {
			const {data: {data: {childCatgories = [], courses}}} = await this.hasSubcategoriesReq(slug)
			const navigationType = childCatgories?.length ? '_blank' : courses?.length ? 'direct' : null
			return new Promise((res, rej) => res({childCatgories, navigationType, courses}))
		} catch (error) {

		}
	}

	handleNoChildCategories() {
		throw new Error("انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا")
	}

	handleProfessionalCase({professionalLicense, groupedPackages, rest}) {
		const isProLicencse = professionalLicense && groupedPackages
		if (!(professionalLicense && groupedPackages)) return
		return isProLicencse
	}

	async handleClick(Category){
		try {

			const {history} = this.props;
			const {slug: categSlug, professionalLicense,nameAr, groupedPackages, ...rest} = Category;
			// this.changeTab(freeMeetingsText)
			const {navigationType, courses} = await this.validateHasSubCategories(categSlug)
			const url = `./${categSlug}`
			if (this.handleProfessionalCase({professionalLicense, groupedPackages, rest})) return
			if (!navigationType) this.handleNoChildCategories()
			if (navigationType === '_blank') window.open(url)
			else {
				this.setState({...this.state, courses,currentSlug : categSlug})
				this.changeTab(nameAr)
				// history.push(url);
			}
		} catch (error) {

			this.warningAlert(error?.message)

		}
	}

	rendersubCategories() {
		return this.state.subcategoriesdetails.map((Category, count) => (
				<NavTab
					key={Category.id}
					currentTab={this.state.currentTab}
					id={Category?.nameAr}
					name={Category.nameAr}
					onClick={() => this.handleClick(Category)}
				/>
		));
	}

	openFreeLecture(lecture) {
		let token = localStorage.getItem("token");
		if (token) {
			window.open(lecture.broadcastUrl, "_blank");
		} else {
			swal(
				"عفواً",
				"يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
				"error",
				{
					button: "متابعة",
				}
			);
		}
	}

	simulateClick(divId, event = 'click') {
		const element = document.getElementById(divId);
		const evObj = document.createEvent('Events');
		evObj.initEvent('click', true, false);
		element.dispatchEvent(evObj)
	}

	renderLectures() {
		const sortedLectures = this.state.lectures.sort(
			(b, a) => a.scheduledAt - b.scheduledAt
		);

		return sortedLectures.map((lecture) => {
			const scheduledAt = new Date(lecture.scheduledAt);
			//Date
			var day = scheduledAt.getDate();
			var month = scheduledAt.getMonth() + 1;
			var year = scheduledAt.getFullYear();
			var scheduledDate = year + "-" + month + "-" + day;
			var hijriDate = moment(scheduledDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
			//Time
			var lectureTime = scheduledAt.getTime();
			const hours = `0${new Date(lectureTime).getHours()}`.slice(-2);
			const minutes = `0${new Date(lectureTime).getMinutes()}`.slice(-2);
			const time = `${hours}:${minutes}`;
			var ampm = hours < 12 || hours === 24 ? "AM" : "PM";

			return (
				<li
					key={lecture.id}
					className="list-group-item d-flex justify-content-between align-items-center"
					dir="rtl"
				>
					<div className="media d-flex align-items-center">
						<div className="gradient-bg mr-4 d-flex align-items-center justify-content-center">
							<FaGraduationCap className="text-white" size="34"/>
						</div>
						<div className="media-body">
							<h6 className="dark-text">{lecture.nameAr}</h6>
							<div className="d-flex align-items-center">
								<h5 className="mid-text small en-text d-flex align-items-center">
									<img
										src={process.env.PUBLIC_URL + "/assets/images/calendar.png"}
										height="12"
										width="12"
										className="mr-1"
									/>
									{hijriDate}
								</h5>

								<h5 className="mid-text small en-text d-flex align-items-center">
									<img
										src={process.env.PUBLIC_URL + "/assets/images/clock.png"}
										className="mr-1 ml-3"
										height="15"
										alt="Time"
									/>
									<span dir="ltr">
                   {time} {ampm}
                 </span>
								</h5>
							</div>
							{lecture.instructor && (
								<p className="light-text small mb-0">
									{lecture.instructor && lecture.instructor.name}
								</p>
							)}
						</div>
					</div>
					{lecture.broadcastUrl && (
						<button
							className="btn light-outline-btn unset-height"
							onClick={() => this.openFreeLecture(lecture)}
						>
							انضم
						</button>
					)}
				</li>
			);
		});
	}

	changeTab(tab) {
		this.setState({...this.state, currentTab: tab});
	}

	simulateClick(divId, event = 'click') {
		const element = document.getElementById(divId);
		const evObj = document.createEvent('Events');
		evObj.initEvent('click', true, false);
		try {
			element.dispatchEvent(evObj)

		} catch (error) {
		}

	}

	renderCompetitions() {
		const {
			match: {params},
		} = this.props;
		return this.state.competitions.map((competition) => (
			<React.Fragment>
				<div
					className="competition-box d-flex flex-column justify-content-center clickable"
					onClick={() =>
						this.props.history.push(
							`/categories/details/${params.slug}/competition/${competition.id}`
						)
					}
				>
					<div className="box-img">
						<img
							src={
								competition.isTaken
									? process.env.PUBLIC_URL +
									"/assets/images/competition-disabled.png"
									: process.env.PUBLIC_URL + "/assets/images/competition.png"
							}
							height="50"
						/>
					</div>
					<div className="box-body">
						<h6 className="dark-text mb-1">{competition.name}</h6>
						{competition.isTaken ? (
							<div className="red-label">
								<p className="text-white text-break mb-0">
									تمت المشاركة بالمسابقة
								</p>
							</div>
						) : (
							<div className="light-label">
								<p className="text-white text-break mb-0">تحدى نفسك</p>
							</div>
						)}
					</div>
				</div>
			</React.Fragment>
		));
	}

	Rating = ({successCase}) => {
		return (
			<div class="card-body px-2 py-2">
				<p class="d-flex align-items-center light-gray mb-1 font-size-13">
					<span class="d-block main-color-light mr-2">اسم الطالب : </span>
					{successCase?.rating?.studentName}
				</p>
				<p class="light-gray font-size-13 m-0">
					<span class="main-color-light">التقييم : </span>
					{successCase?.rating?.feedBack}
				</p>
			</div>
		);
	};

	renderSuccess() {
		return this.state.successes.map((successCase) => (
			<React.Fragment>
				<div class="col-lg-4">
					<div class="status-card sider-items min-height-150">
						<div class="quote-icon">
							<i class="fas fa-quote-left"></i>
						</div>
						<h6 class="h6 main-color-light text-center mb-3">
							{successCase?.courseName}
						</h6>
						<div class="card">{contentReducer(successCase)}</div>
					</div>
				</div>
			</React.Fragment>
		));
	}

	render() {
		let token = localStorage.getItem("token");
		const {state : {currentTab}} = this

		const {
			match: {params},
		} = this.props;

		console.log({currentSlug : this.state.currentSlug,page:this.state.page});
		return (
			<React.Fragment>
				<Helmet>
					<title>{`${this.state.details.nameAr} | منصّة همّة التعليمية`}</title>
					<meta name="description" content={this.state.details.descriptionAr}/>
				</Helmet>

				<section id="license-two" className="license-two">
					<div className="container">
						<header className="mb-4">
							<div className="text-center mb-2">
								<img
									src={
										process.env.PUBLIC_URL +
										"/assets/images/hemma-logo-light.svg"
									}
									className="max-height-80"
									alt="Hemma-Logo"
								/>
							</div>
							<h3 className="h3 main-color mb-3 font-weight-bold text-center">
								{this.state.details.nameAr}
							</h3>
							<p className="description-card main-color font-weight-bold mb-0 text-center">
								{this.state.details.descriptionAr}
							</p>
						</header>
						<div className="lic-tabs">
							<nav>
								<div
									className="nav d-flex align-items-center justify-content-center mb-6 col-12"
									id="nav-tab"
									role="tablist"
								>
									{/* {this.rendersubCategories()} */}
									<SubCategories handleClick={(category) => this.handleClick(category)} subCategories={this.state.subcategoriesdetails} currentTab={this.state.currentTab}  />
												<NavTab
													currentTab={this.state.currentTab}
													id="tab-two"
													name={'دورات المنصة'}
													onClick={() => this.changeTab('tab-two')}
												/>
												{!!this.state.lectures?.length && (
													<NavTab
														id={freeMeetingsText}
														currentTab={this.state.currentTab}
														name={freeMeetingsText}
														onClick={() => this.changeTab(freeMeetingsText)}
													/>
												) }

												{this.state.hasProfessionalLicense && (
													<NavTab
														currentTab={this.state.currentTab}
														isActive={
															this.state.currentTab === ProfessionalLicenseText
														}
														id={ProfessionalLicenseText}
														name="الرخصة المهنية"
														onClick={() => this.changeTab("الرخصة المهنية")}
													/>
												) }

												{!!this.state.successes.length && 
												<NavTab
												currentTab={this.state.currentTab}
												id={"tab-four"}
												name="نجاحات همة"
												onClick={() => this.changeTab("tab-four")}
											/>}

											{!!this.state.categoryGroups.length && 
												<NavTab
												currentTab={this.state.currentTab}
												id={"tab-three"}
												name="المجموعات المجانيه"
												onClick={() => this.changeTab("tab-three")}
											/>}
								</div>
								<ShowAt at={!staticTabs.includes(this.state.currentTab)}>
										<div className="row">
										{this.renderCourses(this.state.courses)}
										</div>
									</ShowAt>
								<div className="tab-content" id="nav-tabContent">
										<ShowAt at={!staticTabs.includes(this.state.currentTab)}>
											
												<div className="container">
													<div className="row">
														{!this.state.currentSlug && !this.state.noMoreCourses && (
															<div className="row col-md-12">
																<div
																	className="col-md-12 d-flex align-items-center justify-content-center">
																	<button
																		className="btn dark-btn unset-height unset-line-height br-5 w-20"
																		onClick={this.loadMore}
																		disabled={this.state.disabled}
																	>
																		{this.state.loading == true ? (
																			<Loader type="ball-clip-rotate"/>
																		) : (
																			"عرض المزيد"
																		)}
																	</button>
																</div>
															</div>
														)}
													</div>
												</div>
										</ShowAt>
									<>
											{this.state.currentTab === ProfessionalLicenseText && (
												<ProfessionalLicense
													categoryData={this.state.details}
												/>
											)}
										</>
										<>
											{this.state.currentTab === 'tab-three' && (
												<>
												{this.renderCategoryGroups()}
												</>
											)}
										</>
									
										<ShowAt at={this.state.currentTab === freeMeetingsText}>
											<div className="container">
												<div className="row">{this.renderLectures()}</div>
											</div>
										</ShowAt>
								
									<div
									>
										<div className="container">
											<ShowAt at={this.state.currentTab === "tab-four"}>
												<div className="row">
													{this.renderSuccess()}
													{this.state.hideBtnSuccess && (
														<div className="row col-md-12">
															<div
																className="col-md-12 d-flex align-items-center justify-content-center">
																<button
																	className="btn dark-btn unset-height unset-line-height br-5 w-20"
																	onClick={this.moreSucces}
																>
																	{this.state.loading == true ? (
																		<Loader type="ball-clip-rotate"/>
																	) : (
																		"عرض المزيد"
																	)}
																</button>
															</div>
														</div>
													)}
												</div>
											</ShowAt>
										</div>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}
const Rating = ({ successCase }) => {
  return (
    <div class="card-body px-2 py-2">
      <p class="d-flex align-items-center light-gray mb-1 font-size-13">
        <span class="d-block main-color-light mr-2">اسم الطالب : </span>
        {successCase?.rating?.studentName}
      </p>
      <p class="light-gray font-size-13 m-0">
        <span class="main-color-light">التقييم : </span>
        {successCase?.rating?.feedBack}
      </p>
    </div>
  );
};

const contentReducer = (successCase) => {
	switch (successCase?.source) {
		case "Media":
			return (
				<a href={successCase?.url}>
					<img
						src={successCase?.img}
						className="w-100 height-70"
						style={{height: "170px !important"}}
					/>import SubCategories from './subCategories/index';

				</a>
			);
		case "Rating":
			return <Rating successCase={successCase}/>;
		default:
			break;
	}
};

export const CategoryDetails = withRouter((props) => {
  const [show, setShow] = useState(true);
  const {
    location: { pathname },
  } = props;
  const toggleShow = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 50);
  };

  useEffect(() => {
    toggleShow();
  }, [pathname]);

  return <>{show && <_CategoryDetails {...props} />}</>;
});
