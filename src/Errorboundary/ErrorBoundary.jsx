import React,{ Component } from 'react';

class ErrorBoundary extends Component
{
  constructor(){
    super();
    this.state={
      hasError:false
    }
  }
 static getDerivedStateFromError(error){
        return {hasError:true}
      }
      componentDidCatch(error,info){
        console.log(error);
        console.log(info);
      }
  render(){
    if(this.state.hasError){
    return <h1>Something went Wrong</h1>
    }
    console.log(this.props.children)
   return this.props.children;
 }
}
export default ErrorBoundary