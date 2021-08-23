import React, {Component} from "react";
import axios from "axios";

import './main.css'
import TextArea from './text-area/index';

export default class LandingPage  extends Component {
	constructor(props) {
		super(props);
		this.errorClass = "border border-danger"
		this.toPlacholder = ["966xxxxxxxxx"," أدخل رقم جوال صديق، لتصله الرسالة وبذلك يدخل السحب على مقعد مجاني"]
		this.fromPlcholder = ["966xxxxxxxxx "," أدخل رقم جوالك لتدخل على السحب بقيمة ٥٠٠ ريال"]
		this.state = {
			isPlaying:false,
			pinkBg:true ,
			playIcon:true ,
			hemmaImg:true ,
			hemmaVideo:false,
			from:'',
			to:''
		};
	}

	onFromChange = (event) => {
		this.setState({from: event.target.value})
	}

	onToChange = (event) =>{
		this.setState({to: event.target.value})
	}
	onPause = () => {
		this.setState({isPlaying:false ,pinkBg:true , playIcon:true , hemmaImg:true ,hemmaVideo:false })
		this.refs.vidRef.pause();
	};


	onclick = () => {
		const {isPlaying} = this.state;

		if (!isPlaying) {
			this.setState({isPlaying:true ,hemmaVideo:true ,pinkBg:false , playIcon:false , hemmaImg:false  })
			this.refs.vidRef.play();
		}

	};
	handleSubmit = (e) => {
		e.preventDefault();
		let headers = {
			'Content-Type': 'application/json'
		}
		// let data = {
		// 	from:this.state.from,
		// 	to: this.state.to,
		// };
		const from = this.state.from;
		const to = this.state.to;
		this.setState({...this.state,loading:true})
		axios
			.get
		(`https://www.gheeed.com/hemaa/index.php?from=${from}&to=${to}`,{
			headers,
		}
		).then((response) => {
			this.setState({...this.state,loading:false})

			if (response.data.status) {
				alert(response.data.message || "Message Sent.");
				this.resetForm()
			} else {
				alert(response.data.message ||  "Message failed to send.")
			}
		})
			.catch((error) => {
				this.setState({...this.state,loading:false,disabled: false})
				console.log(error);
			});
	};
	resetForm =() =>{
		this.setState({from:'',to:''})
	}

	componentDidMount() {
		setTimeout(
			() => this.onclick(), 
			1000
		  );
	}

	

	render(){
		return (
			<div className='fragment'>
				<div className="w-100" dir="ltr">
					<div className="d-flex mt-4 flex-column flex-md-row justify-content-between align-items-center">
						<div className="order-1 main-color-dark w-100 text-center ">
							<h2 className="font-lg">مع همة الرخصة المهنية ما هي هم</h2>
							<h4 className="mt-4 dark-font font-weight-600">همة، المنصة الأولى في تمكين المُقبلين على اختبار الرخصة المهنية</h4>
						</div>
						<img className="h-auto logo order-md-1 order-0" src='/assets/images/Hemma-logo.png' alt="Logo" />
					</div>

					<div className="hidden">a</div>
					<div className="row justify-content-between mid-content mt-4">
						<div className="col-lg-5">
							<div className="left-img-wrapper h-100 position-relative">
								<div className="img-wrapper stretched-absolute">
									{/* <img
										src="/assets/images/video-thumb.png"
										id="hemma-img"
										className="position-relative"
										alt=''
										style={{ display: this.state.hemmaImg?'block': "none" }}

									/> */}
									{/* <div id="pick-bg"
									     style={{ display: this.state.pinkBg?'block': "none" }}
									     className="pink-shadow stretched-absolute"/> */}
									<img
										src="/assets/images/video-play-icon.png"
										className="position-absolute play-icon absolute-center"
										id="play-icon"
										alt=''
										onClick={this.onclick}
										style={{ display: this.state.playIcon?'block': "none" }}
									/>
									<video id="hemma-video" onPause={this.onPause} controls
									       style={{ display: 'block' }}
									       ref="vidRef"
									>
										<source src="https://hemma.ams3.cdn.digitaloceanspaces.com/videos/videos/V1-Boy.mp4" />
										<div className="pink-shadow stretched-absolute" />
									</video>
								</div>
							</div>
						</div>
						<div className="col-lg-7 text-right text-spaced top-content line-heigh-lg">
							<div className="d-flex rtl">
								<h5 className="main-color font-weight-bold text-right  ml-auto mt-5 mt-lg-0">
									اعتمادًا على خبرتنا الطويلة في تمكين أكثر من ۱۰۰ ألف في اختبار
									الرخصة المهنية.
								</h5>
							</div>
							<h6 className="mt-3 dark-font font-weight-500 rtl">
								نُطلق هذه الحملة لنختصر طريق طويل وشاق على الخريجين، والخريجات المُقبلين على اختبار الرخصة المهنية ليكونوا في مكانهم الصحيح كمعلمين، ومعلمات بالإضافة للمعلمين على رأس العمل.
							</h6>
							<h6 className="mt-3 dark-font font-weight-500 rtl">
								أرسل الرسالة أدناه لخريج، أو معلم على رأس العمل، ومُقبل على اختبار الرخصة المهنية للانضمام لهِمّة من خلال ٣٠ مقعد مجاني، وبذلك تكون دخلت أنت أيضًا تلقائيًا على السحب
								مبلغ نقدي ٥٠٠ ريال.
							</h6>
							<h6 className='dark-font font-weight-500 rtl'>
							</h6>
						</div>
					</div>
					<form id="contact-form" action="/" onSubmit={this.handleSubmit} >
					<div className="bottom-section mt-5 p-5">
						<div className="row text-right">
							<div className="col-lg-4 mt-lg-0 mt-3 order-lg-0 order-1">
								<div className="rtl">
									<div className="field form-group">
										<h5 className="field-title main-color font-md">
											رقم جوال المرسل
										</h5>
										<TextArea 
										cols="40" rows={!this.state.from.length ?  3  : 1}
										className={"field-input pb-0 position-relative"}
										value={this.state.from}
										onChange={this.onFromChange}
										placholderText={this.fromPlcholder}
										show={!this.state.from.length}
										/>
										{!!(this.state.from.length !== 12 && this.state.from.length) && <span className="text-danger font-sm">يجب ادخال الرقم على الصيغه التاليه 966xxxxxxxxx </span>}
									</div>
									<div className="field mt-3 form-group">
										<h5 className="field-title main-color font-md">
											رقم جوال المرسل إليه
										</h5>
										<TextArea 
										cols="40" rows={!this.state.to.length ?  3  : 1}
										className={"field-input pb-0"}
										value={this.state.to}
										onChange={this.onToChange}
										placholderText={this.toPlacholder}
										show={!this.state.to.length}
										/>
										{!!(this.state.to.length !== 12 && this.state.to.length) && <span className="text-danger font-sm">يجب ادخال الرقم على الصيغه التاليه 966xxxxxxxxx </span>}
									</div>
									<div className="d-flex w-100 justify-content-lg-start">
										<button disabled={this.state.loading} className="custom-btn mt-3 w-100" type="submit">{this.state.loading ? 'يتم الارسال' : 'أرسل'}</button>
									</div>
								</div>
							</div>
							<div className="col-lg-8  order-lg-1">
								<div className="bottom-summary pl-3 h-100">
									<p className="main-color  rtl">
										مُقبل على الرخصة المهنية، كيف ما تعرف هِمّة ؟
										<br />
										مكنّا ما يزيد عن ١٠٠ ألف في اختبار الرخصة المهنية، وبدرجات عالية.
										<br />
										نُراهن على خبرة طويلة تمتد لأكثر من ٢٥ عام في تمكين الطلاب،
										والمعلمين، لذا نحن اليوم المنصة الأولى في مجالنا.
										<br />
										نُقدم لك حقائب شاملة، تدريبات مكثفة لاختبارات محاكية، وشروحات
										مسجلة.
										<br />
										كل ما تحتاجه للاستعداد لاختبار الرخصة يُقدم لك باحترافية عالية في
										هِمّة .
									</p>
								</div>
							</div>
						</div>
					</div>
					</form>
				</div>
			</div>
	)
}}
