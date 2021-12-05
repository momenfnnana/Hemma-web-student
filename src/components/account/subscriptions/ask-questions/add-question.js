import React, {Component} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Label} from "reactstrap";
import axios from "axios";
import {apiBaseUrl} from "../../../../api/helpers";
import {withRouter} from "react-router-dom";
import swal from "sweetalert";

class AddQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			file: "",
			questionType: "",
			sections: [],
			sectionId:'',
			disableAdd: true,
			disable:true,
			question:null,
			submitLoading: false,
			// type:"Text",
			// content:null
		};
		this.setLoading = this.setLoading.bind(this)
	}



	handleChange = (key ,event) => {
		const value = event.target.value;
		this.setState({[key]: value} , ()=>{
			const {sectionId ,question} = this.state
			if(sectionId !=='' && question!=null){
				this.setState({disableAdd: false});

			}
		})
	};

	setLoading(loading){
		this.setState({ submitLoading: loading });
	}

	componentDidMount(){
		this.getSections();
	}

	getSections = ()=>{
		const courseId = this.props.match.params.id;

		let token = localStorage.getItem("token");
		let headers = {
			Authorization: `Bearer ${token}`
		};
		axios
			.get(`${apiBaseUrl}/Content/${courseId}/Sections`, { headers })
			.then(response => {
				this.setState({ sections: response.data.data });
				// if(response.data.data && response.data.data.length>=1){
				// 	this.setState({sectionId:response.data.data[0].id})
				// }
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleToggleAdd = () => {
		this.setState({disableAdd: !this.state.disableAdd});
	};

	handleFileChange = event => {
		event.preventDefault();
		let token = localStorage.getItem("token");
		let headers = {
			Authorization: `Bearer ${token}`
		};
		let data = new FormData();
		
		data.append("file", event.target.files[0]);
		axios
		.post(`${apiBaseUrl}/AskQuestions/Uploads`, data, {
			headers
		})
		.then(response => {
			this.setState({file: response.data.data.url, questionType: "Image"});
			// if (this.state.file) {
			// 	const courseId = this.props.match.params.id;
			// 	const sectionId = this.state.sectionId;
			// 	let token = localStorage.getItem("token");
			// 	let headers = {
			// 		Authorization: `Bearer ${token}`
			// 	};
			// 	let data = {
			// 		type: "Image",
			// 		content: this.state.file
			// 	};
			// 	axios
			// 	.post(`${apiBaseUrl}/AskQuestions?courseId=${courseId}&&sectionId=${sectionId}`, data, {
			// 		headers
			// 	})
			// 	.then(response => {
			// 		this.props.updateQuestions(response.data.data);
			// 		this.props.toggleModal();
			// 			})
			// 			.catch(error => {
			// 				this.setState({disabled: false});
			// 				console.log(error);
			// 			});
			// 	}
			// })
			// .catch(error => {
			// 	console.log(error);
			});
	};
	handleSubmit = event => {
		event.preventDefault();
		this.setLoading(true)
		this.handleToggleAdd();
		const courseId = this.props.match.params.id;
		const sectionId = this.state.sectionId;
		let token = localStorage.getItem("token");
		let headers = {
			Authorization: `Bearer ${token}`
		};
		var data=null
		if(this.state.file)
		{
			data = {
				type: "Image",
				content: this.state.file
	};
		}
		else
		{
			data = {
				type: "Text",
				content: this.state.question,
			};
		
		}
		
		axios
			.post(`${apiBaseUrl}/AskQuestions?courseId=${courseId}&&sectionId=${sectionId}`, data, {
				headers
			})
			.then(response => {
				this.props.toggleModal();
				this.setState({sectionId:'',question:null})
				this.props.updateQuestions(response.data.data);
			})
			.catch(error => {
				swal("عفوا",error.message,"error")
			}).finally(()=> {
				this.setLoading(false)
			})
	}

	render() {
		return (
			<React.Fragment>
				<Modal
					isOpen={this.props.isAddQuestionOpen}
					toggle={this.props.toggleModal}
					className="modal-dialog-centered"
				>
					<form onSubmit={this.handleSubmit}>
						<ModalHeader
							toggle={this.props.toggleModal}
							className="bg-light dark-text small mb-0 mt-0"
						>
							اضافة سؤال
						</ModalHeader>
						<ModalBody>
							<label className="dark-text small mb-0 mt-0">الجزء</label>

							<select value={this.state.sectionId}
							        className="form-select w-100 p-2 small dark-text border border-light-2"
							        aria-label="Default select example"
							        onChange={(e)=>this.handleChange('sectionId',e)}
							        name='sectionId'
							>
								<option value='' selected disabled>اختر الجزء </option>
								{
									this.state.sections && this.state.sections.map( (row) =>
										<option value={row.id}>{row.nameAr}</option>
									)
								}
							</select>

							<label className="dark-text small mb-0 mt-0">السؤال</label>

							<div className="position-relative">
                <textarea
	                id="content"
	                type="text"
	                name="content"
	                onChange={(e)=>this.handleChange('question',e)}
	                placeholder="الرجاء ادخال السؤال"
	                rows="6"
	                className="form-control small dark-text shadow-sm mb-3"
	                disabled={this.state.sectionId==''|| this.state.file}
                />
								<div className="textarea-icon d-flex align-items-center">
									<label htmlFor="uploadImage" className="mb-0">
										<input
											className="d-none"
											id="uploadImage"
											type="file"
											onChange={this.handleFileChange}
											disabled={this.state.sectionId=='' }
										/>
										<img
											src={
												process.env.PUBLIC_URL + "/assets/images/picture.png"
											}
											height="30"
											width="30"
											className="contain-img clickable"
											alt="comment"
										/>
									</label>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<button disabled={this.state.submitLoading} className="btn dark-outline-btn w-25" type="submit" onClick={this.onHide}>
								{!this.state.submitLoading ? "اضافة" : "يتم الاضافة"}
							</button>
						</ModalFooter>
					</form>
				</Modal>
			</React.Fragment>
		);
	}
}

export default withRouter(AddQuestion);
