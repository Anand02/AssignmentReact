import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Button } from 'reactstrap';
import { Container,Row,Col,Card,Carousel,ListGroup } from 'react-bootstrap';
import '../index.css';
import Image from 'react-bootstrap/Image';
import "react-multi-carousel/lib/styles.css";
import Spinner from './Spinner';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};


class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            duration:[],
            resultData:[],
            loading:false,
            dataValueArray:[],
            showMenu: false,
            moduleListArray:[],
            deatailData:[],
            url:'https://oldassets.omnicuris.com/courses/video/13_07_17_12_40_08__Prevalence%20and%20Role%20of%20Thyroid%20in%20Pregnancy.mp4'
        }

        this.showMenu = this.showMenu.bind(this);
    }

    passURL(dataV){

        this.setState({
            url:dataV
        })
    }


    showMenu(data) {  
        console.log("----------->",this.state.loading )
        let moduleId = data
        let moduleDetails ="https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy&moduleId="+moduleId;
        axios.get(moduleDetails, { headers : { 'hk-access-token' : '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f' }} )
        .then(res => {  
            let moduleListArray=[]
            res.data.lessonDetails.map( (dataValue) => {     
                var durationStr = dataValue['userChapterDetails'].map(function(s){
                    return s['durationStr']  
                });

                var content = dataValue['userChapterDetails'].map(function(s){
                    return s['content']      
                });

                var title = dataValue['userChapterDetails'].map(function(s){
                    return s['title']     
                });
               
                moduleListArray.push({ 'durationStr' : durationStr , 'content':content, 'title':title})
                 this.setState({
                    moduleListArray: moduleListArray,
                    showMenu: true
                });
            })
        })  
    }

   
   componentDidMount()
   {

    this.setState({ loading: true }, () => {

    let API = "https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy"
    let API2 = " https://stgapi.omnicuris.com/api/v3/courses/thyroid-in-pregnancy/experts"

    axios.get(API2, { headers : { 'hk-access-token' : '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f' }} )
        .then(res => {
           
            this.setState({ deatailData : res.data})
        })

    axios.get(API, { headers : { 'hk-access-token' : '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f' }} )
        .then(res => {
         

            var arr=[]
                
            res.data.courseDetails.modules.map( bank => { arr.push(bank)})
            this.setState({
                resultData:arr,
                loading:false
            })
        
            res.data.courseDetails.modules.map((result, index) => {
        })
               
        }) 
    })    
   }

   render()
   {

    var dataValueArray = [];       
    this.state.resultData.map( (dataValue) => {


        var customer = Object.keys(dataValue['moduleExperts']).map(function(s){return dataValue['moduleExperts'][s].profilePic});

        var expertName = Object.keys(dataValue['moduleExperts']).map(function(s){return dataValue['moduleExperts'][s].expertName});

        var qualification = Object.keys(dataValue['moduleExperts']).map(function(s){return dataValue['moduleExperts'][s].qualification});

        var id = Object.keys(dataValue['moduleExperts']).map(function(s){return dataValue['moduleExperts'][s].moduleId});

        dataValueArray.push({ 'dataValue':dataValue,'id': id , 'expertName': expertName, 'qualification': qualification , 'value': customer , 'time':dataValue.durationStr, 'name' : dataValue.name})

        Object.keys(dataValue['moduleExperts']).forEach(function (element, key) {
 
             return dataValue['moduleExperts']['moduleId'] = dataValue['id']
        })
  
    });
    return(
    <div>

<div className="macs-content">
    <div className="macs-content-body fade-in-up no-padder">
        <div className="bg-light lter b-b rema-cs-xs w-full pull-left">
            <ol className="breadcrumb bc-1 pull-left" style={{ marginBottom: 0 }}>
                <li>Omnicuris</li>
            </ol>
        </div>

<Container>
    <Row>
        <Col sm={8}>
            <section>
                <div >
                { 
                    this.state.loading === true? 
                     <Spinner /> : 
                    <ReactPlayer url={this.state.url} playing />
                }
                </div>
            </section>
        </Col>
        <Col sm={4}>
            <div className="container">   
                <div className="center-col">
                    {
                        dataValueArray.map((result, index) => {
                            return ( 
                                <div class="col ml--2">
                                    <h4 class="mb-0">
                                        <div class="col-auto">                        
                                            <a style={{ cursor: 'pointer' }} onClick={ () => this.showMenu(result.id[0])}>
                                            { 
                                                this.state.loading ? 
                                                     <Spinner /> :
                                                <Card >
                                                    <Card.Body key={index}>
                                                        <Image style={{width: '50px', height: '50px'}} src={result.value[0]} rounded />
                                                        <Card.Title style={{ fontSize: 19,textAlign: 'center' }}>Module Name : <p style={{ fontSize: 14,textAlign: 'center' }}>{result.name}</p></Card.Title>
                                                        <Card.Text style={{ fontSize: 19,textAlign: 'center' }}>
                                                            Duration :{result.time}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            }
                                            </a>
                                        {
                                
                                            this.state.showMenu
                                            ? (
                                                this.state.moduleListArray.map((result, index) => {
                                                var titleValue = result.title.map((v,index) => { return v })
                                                return(
                                                        <a style={{ cursor: 'pointer' }} onClick={ () => this.passURL(result.content[index])}>
                                                            <div className="menu">
                                                                <React.Fragment>
                                                                    <ul class="list-group">
                                                                        <li class="list-group-item list-group-item-primary">{titleValue}</li>         
                                                                    </ul>
                                                                </React.Fragment>
                                                            </div>
                                                        </a>)
                                                    }))
                                            : (
                                            null
                                            )
                                        }
                                        </div>
                                    </h4>
                                </div>)
                            })
                    }    
                </div>
            </div>
        </Col>
    </Row>
</Container>
</div>
</div>

<div class="row" style={{ marginTop:-232}}>
    <div class="col">
        <p> Experts Panel</p>
            <div className="about container">
       
                                {
                                        dataValueArray.map((result, index) => {
                                            return  ( 
                                        <Carousel>
                                            <Carousel.Item>
                                                <div style={{ textAlign: 'center'}}>
                                                <img
                                                className="d-block w-100"
                                                src={result.value[0]}
                                                alt="First slide"
                                                />
                                                <div style={{ color: 'rgb(0, 129, 212)', marginTop: 15, fontFamily: 'Nunito-SemiBold' ,fontSize: 10}}>{result.expertName[0]}</div>
                                                <div style={{color: 'rgb(240, 47, 114',fontSize: 10}}> {result.qualification[0]}</div>
                                                </div>
                                                <Carousel.Caption>
                                                
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        </Carousel>
                                            )
                                        })
                                }            
            </div>
    </div>
</div>
</div>)}
}

export default Home