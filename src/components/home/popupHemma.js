import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import "./main.sass";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default class PopupHemma  extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false
		};
	}
	handleTogglePopup =() =>{
		this.setState({show:!this.state.show})
	};

	componentDidMount() {
	this.handleTogglePopup();
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
									<select>
										<option> </option>
										<option value="ar">اللغة العربية</option>
										<option value="geographic">الجغرافيا</option>
										<option value="family">التربية الاسرية</option>
										<option value="en"> اللغة الانجليزية</option>
										<option value="pc"> الحاسب الآلي</option>
										<option value="learning-difficulties">صعوبات التعلم</option>
										<option value="row">الصفوف الاولية</option>
										<option value="general">العام</option>
										<option value="history">التاريخ</option>
										<option value="disability">الإعاقة العقلية</option>
										<option value="aviva">الاحياء</option>
										<option value="math">الرياضيات</option>
										<option value="chemistry"> الكيمياء</option>
										<option value="kindergarten">رياض الأطفال</option>
										<option value="physical"> التربية البدنية</option>
										<option value="social">الاجتماعيات</option>
										<option value="islamic">التربية الاسلامية</option>
										<option value="science">العلوم</option>
										<option value="art">التربية الفنية</option>
										<option value="physics">الفيزياء</option>
									</select>
									<Button variant="info btn">انضم للمجموعات، وجرب تختبر</Button>
								</div>
							</div>
							<div className='row my-3'>
								<div className="col-md-6">
						            <div className='col-md-12 p-4 content-why box text-center'>
								      <h4>ليش هِمّة المنصة الأولى في تمكين المُقبلين على اختبار الرخصة المهنية؟</h4>
								      <p>استفاد منّا أكثر من ١٠٠ ألف حتى الآن في اختبار الرخصة المهنية، وبدرجات عالية، وفي كل التخصصات.</p>
							            <p>خبرتنا أكثر من ٢٥ عامًا في تمكين الطلاب والمعلمين.</p>
							            <Button variant="info btn">شوف تجارب مشتركينا السابقين</Button>
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
										<Button variant="info btn">أرسل الرسالة من خلال هِمّة</Button>
									</div>
								</div>
							</div>
					</Modal.Body>
				</div>
			</Modal >
		</>
	)
}}
