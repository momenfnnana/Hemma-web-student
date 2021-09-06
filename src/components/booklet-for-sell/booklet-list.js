import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { BookletCardList } from "../shared/bookletCardList/bookletCardList";
import { apiBaseUrl } from "../../api/helpers";
import "./styles.sass"
import "./index.scss"
export default class BookletComponent extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selected_platform: "",
            booklets:[],
            search:"",
            loading:true
        }
        this.select = this.select.bind(this);
        //this.loadBooklets = this.loadBooklets(this);
        
    }



    loadCategories() {
        this.setState({ loading: true });

        axios
            .get(`${apiBaseUrl}/bookletforsell/GetBookletsCategories`)
            .then(response => {
              

                this.setState({ categories: response.data.data });
                setTimeout(
                    function () {
                        this.setState({ loading: false });
                    }.bind(this),
                    800
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    getbooklets(platform)
    {
        axios
        .get(`${apiBaseUrl}/bookletforsell/bookletforsell?platform=`+platform+"&search="+this.state.search)
        .then(response => {
            
             this.setState({ booklets: response.data.data,selected_platform:platform,loading:false });
            
            setTimeout(
                function() {
                    this.setState({ loading: false });
                }.bind(this),
                800
            );
         
        })
        .catch(error => {
            console.log(error);
        });
    }

    search = (e) =>  {
        this.getbooklets(this.state.selected_platform);
      
    }

    
    loadBooklets = (e) =>  {
        this.getbooklets("");
      
    }

    componentDidMount() {
      
        this.loadCategories();
        this.getbooklets("");

    }

    searchHandler = (event) => {
        this.setState({search: event.target.value,loading:true});
      }

    select = (e) => {
        this.getbooklets(e.target.value);
       
        // axios
        // .get(`${apiBaseUrl}/bookletforsell/bookletforsell?platform=`+ e.target.value)
        // .then(response => {
            
        //      this.setState({ booklets: response.data.data });
        //      console.log(this.state);
            
        //     setTimeout(
        //         function() {
        //             this.setState({ loading: false });
        //         }.bind(this),
        //         800
        //     );
         
        // })
        // .catch(error => {
        //     console.log(error);
        // });

        // this.state.booklet_obj.loadBooklets(e.target.value);
        //this.loadBooklets(e.target.value);
        
      };

  

    renderCategoryFilter() {
        if (this.state.categories.length > 0) {
          
            return (
                <select onChange={this.select} value={this.state.selected_platform} className="form-control border-radius-50 placeholder-gray mb-2">
                      <option className="form-control border-radius-50 placeholder-gray mb-2" value="">التصنيف</option>
                    {
                        this.state.categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }

                </select>)
        }

    }

    renderBooklet() {
        return (
            <React.Fragment>
          {/* <div class="container-fluid p-0">
           <nav aria-label="breadcrumb">
           <ol class="breadcrumb bg-transparent pt-4 px-0">
            <li class="breadcrumb-item"><a href="/home">الرئيسيه</a></li>
            <li class="breadcrumb-item active" aria-current="page">متجر همة للكتب</li>
           </ol>
           </nav>
            </div> */}
                <div className="row">


                    <div className="col-md-9 mb-4">
                    <div class="position-relative">
                     <i className="fas fa-search input-search-icon"></i>

                    <input onChange={this.searchHandler} onBlur={this.search} placeholder="البحث باسم الملزمة" className="search-input form-control border-radius-50 placeholder-gray mb-2 "></input>     
                     {/* <div className="search-btn cursor-pointer" onClick={this.search}>
                     <i className="fas fa-search"></i>
                     </div>  */}

                        
                        {/* <input onChange={this.searchHandler}  placeholder="البحث باسم الملزمة" className="search-input"></input>
                        <button onClick={this.search} className="search-btn"><i className="fas fa-search"></i></button> */}

                    </div>
                    </div>
    
                    <div className="col-md-3">
                        {this.renderCategoryFilter()}
                    </div>              


                </div>
<div className="row">
    <BookletCardList booklets={this.state.booklets}  loading={this.state.loading} />
</div>

            </React.Fragment>
        )
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>بيع الملازم | منصّة همّة التعليمية</title>
                    <meta
                        name="description"
                        content="تعرّف على أحدث الدورات المتاحة حالياً وقم باختيار الدورة المناسبة الآن!"
                    />
                </Helmet>
                <section className="pt-3 pb-5  booklet-wrapper">
                    <div className="container">{this.renderBooklet()}</div>
                </section>
            </React.Fragment>
        );


    }
}