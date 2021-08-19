import React, {Component} from "react";
import './main.css'

export default class LandingPage  extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying:false,
			pinkBg:true ,
			playIcon:true ,
			hemmaImg:true ,
			hemmaVideo:false
		};
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

	render(){
		return (
			<div className='fragment'>
				<div className="w-100" dir="ltr">
					<div className="d-flex justify-content-end">
						<img className="h-auto logo" src='/assets/images/Hemma-logo.png' alt="Logo" />
					</div>
					<div className="main-color-dark w-100 text-center mb-lg-5 mb-0 mt-4">
						<h2 className="font-lg">مع همة الرخصة المهنية ما هي هم</h2>
						<h4>همة، المنصة الأولى في تمكين المُقبلين على اختبار الرخصة المهنية</h4>
					</div>
					<div className="hidden">a</div>
					<div className="row justify-content-between mt-3">
						<div className="col-lg-6">
							<div className="left-img-wrapper h-40 position-relative">
								<div className="img-wrapper stretched-absolute">
									<img
										src="/assets/images/video-thumb.png"
										id="hemma-img"
										className="position-relative"
										alt=''
										style={{ display: this.state.hemmaImg?'block': "none" }}

									/>
									<div id="pick-bg"
									     style={{ display: this.state.pinkBg?'block': "none" }}
									     className="pink-shadow stretched-absolute"/>
									<img
										src="/assets/images/video-play-icon.png"
										className="position-absolute play-icon absolute-center"
										id="play-icon"
										alt=''
										onClick={this.onclick}
										style={{ display: this.state.playIcon?'block': "none" }}
									/>
									<video id="hemma-video" onPause={this.onPause} controls
									       style={{ display: this.state.hemmaVideo?'block': "none" }}
									       ref="vidRef"
									>
										<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
										<div className="pink-shadow stretched-absolute" />
									</video>
								</div>
							</div>
						</div>
						<div className="col-lg-6 text-right text-spaced top-content line-heigh-lg">
							<div className="d-flex rtl">
								<h5 className="main-color font-weight-bold text-right  ml-auto mt-5 mt-lg-0">
									اعتمادًا على خبرتنا الطويلة في تمكين أكثر من ۱۰۰ ألف في اختبار
									الرخصة المهنية.
								</h5>
							</div>
							<p className="mt-2 dark-font">
								نُطلق هذه الحملة لنختصر طريق طويل وشاق على الخريجين، والخريجات المُقبلين على اختبار الرخصة المهنية ليكونوا في مكانهم الصحيح كمعلمين، ومعلمات بالإضافة للمعلمين على رأس العمل
							</p>
							<p className="mt-2 dark-font">
								أرسل الرسالة أدناه لخريج، أو معلم على رأس العمل، ومُقبل على اختبار الرخصة المهنية للانضمام لهِمّة من خلال ٣٠ مقعد مجاني، وبذلك تكون دخلت أنت أيضًا تلقائيًا على السحب (مبلغ نقدي ٥٠٠ ريال)
							</p>
						</div>
					</div>
					<div className="bottom-section mt-5 p-5">
						<div className="row text-right justify-content-between">
							<div className="col-lg-4 mr-1 mt-0 order-lg-0 order-1">
								<div className="rtl">
									<div className="field">
										<label className="field-title  font-md">
											رقم جوال المرسل
										</label>
										<input
											placeholder="أدخل رقم جوالك لتدخل على السحب بقيمة ٥٠٠ ريال"
											className="field-input"
											// defaultValue={"                        "}
										/>
									</div>
									<div className="field mt-3">
										<label className="field-title font-md">
											رقم جوال المرسل إليه
										</label>
										<input
											placeholder="أدخل رقم جوال صديق، لتصله الرسالة وبذلك يدخل السحب على مقعد مجاني."
											className="field-input"
											// defaultValue={"                                "}
										/>
									</div>
								</div>
							</div>
							<div className="col-lg-7  order-lg-1">
								<div className="bottom-summary pl-3">
									<p className="font-md  rtl">
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
						<div className="d-flex w-100 justify-content-lg-start">
							<button className="custom-btn mt-3">أرسل</button>
						</div>
					</div>
				</div>
			</div>
	)
}}
