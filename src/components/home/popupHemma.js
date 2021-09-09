import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import "./main.sass";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/es/Link";

export default class PopupHemma  extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false,
			path:'/home',
		};
	}
	handleTogglePopup =() =>{
		this.setState({show:!this.state.show})
	};

	componentDidMount() {
	// this.handleTogglePopup();
	}
	handleChangeGroup = (e) =>{
		this.setState({path:e.target.value})
	}

	render(){
	return (
		<>
			<Modal show={this.state.show}
			       onHide={this.handleTogglePopup}
			       centered
			>
				<div className='container-popup p-4'>
					<Modal.Header closeButton>
						<Modal.Title className='model-title'>الرخصة المهنية ما هي هم</Modal.Title>
						<p>هِمّة، المنصة الأولى في تمكين المُقبلين على اختبار الرخصة المهنية</p>
					</Modal.Header>
					<Modal.Body>
							<div className='col-12 choose-specialization-wrapper'>
								<h4>الرخصة المهنية أبدًا ماهي صعبة، ولا تحدي مع هِمّة</h4>
								<p>من خلال المجموعات المجانية: تمنحك هِمّة فرصة تفاعل عظيمة مع كل الّذين مثلك يخوضون تجربة الرخصة المهنية، اختر تخصصك ولا تتردد تنضم للمجموعة التي تحتوي على اختبارات إلكترونية مُحاكية لاختبارات قياس تساعدك تعيش التجربة، وتستعد بشكل صحيح.</p>
								<div className='choose-specialization '>
									<label>اختر تخصصك </label>
									<select onClick={this.handleChangeGroup}>
										<option> </option>
										<option value="/categories/details/%D9%87%D9%85%D8%A9_%D9%84%D9%84%D9%85%D8%B9%D9%84%D9%85%D9%8A%D9%868253/quick-questions/093fb168-df68-480d-8c40-33bb8830c508">اللغة العربية</option>
										<option value="categories/details/همة_للمعلمين8253/quick-questions/264314fc-d49a-4975-befe-6bc980ce0ee1">الجغرافيا</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/290c2885-f2b8-48f5-b037-5e8158c5a489">التربية الاسرية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/5afe636b-060e-4d22-b311-36262c599505"> اللغة الانجليزية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/6640e26a-69bb-42f4-9902-65a3f6537b2b"> الحاسب الآلي</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/7e53e0ad-4e9f-4d61-b592-e9c86989733a">صعوبات التعلم</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/83b18832-a3e8-47ec-9be7-3f1b9335ed79">الصفوف الاولية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/8cab07d6-df5c-4cb1-a2ea-5257c134e2a2">العام</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/9c6ce665-2beb-4cb0-b5a0-936129a3fa6c">التاريخ</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/a2296f82-1864-4bae-a65b-9dc6ee356030">الإعاقة العقلية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/a476debf-8443-4257-8daa-475ec0272fa5">الاحياء</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/a78be90d-f546-4cc2-aafc-30ee0305ce4c">الرياضيات</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/b4f29012-f701-463b-81ab-bce2d5fa5761"> الكيمياء</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/beb4c21a-be79-4abf-b46d-30df8c3cb53a">رياض الأطفال</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/d3bb5875-0397-44c9-8446-06e759a391ef"> التربية البدنية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/d4ab47c4-3ab9-42bb-8e9e-85b8585f7481">الاجتماعيات</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/d7ca7489-e0bc-40f5-b7e7-08cd1a7d2b78">التربية الاسلامية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/e17c6506-6b7e-4658-935d-7ba217df94f2">العلوم</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/e50a9812-7852-46b8-af5e-8fa43efbe8df">التربية الفنية</option>
										<option value="/categories/details/همة_للمعلمين8253/quick-questions/fbe3e053-0f62-4695-94a3-f96d93d4ad17">الفيزياء</option>
									</select>
									<Link to={this.state.path}>
										<Button variant="info btn">انضم للمجموعات، وجرب تختبر</Button>
									</Link>
								</div>
							</div>
							<div className='row my-3'>
								<div className="col-md-6">
						            <div className='col-md-12 p-4 content-why box text-center'>
								      <h4>ليش هِمّة المنصة الأولى في تمكين المُقبلين على اختبار الرخصة المهنية؟</h4>
								      <p>استفاد منّا أكثر من ١٠٠ ألف حتى الآن في اختبار الرخصة المهنية، وبدرجات عالية، وفي كل التخصصات.</p>
							            <p>خبرتنا أكثر من ٢٥ عامًا في تمكين الطلاب والمعلمين.</p>
							            <Link to='/home/hemma-succes'>
								            <Button variant="info btn">
									            شوف تجارب مشتركينا السابقين
								            </Button>
							            </Link>
						            </div>
								</div>
								<div className='col-md-6'>
									<div className='col-md-12 p-4 content-invitation box text-center'>
								        <h4>تعرف خريج/ة أو معلم/ة قدامه اختبار الرخصة المهنية!!</h4>
								        <p>أرسل له من خلال موقع منصة هِمّة:
								          <span> "اختبار الرخصة المهنية مع هِمّة ماهي هم" </span>
								        </p>
								        <p>عند إرسالك هذه الرسالة سيدخل اسمك ضمن السحب على ٥٠٠ ريال.</p>
										<p>والمُرسل إليه سيكون واحد من المرشحين بـ ٣٠ مقعد مجاني في دورات الرخصة المهنية .</p>
										<Link to='/market'>
										<Button variant="info btn">
											أرسل الرسالة من خلال هِمّة
										</Button>
										</Link>

									</div>
								</div>
							</div>
					</Modal.Body>
				</div>
			</Modal >
		</>
	)
}}
