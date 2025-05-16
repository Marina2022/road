import React from 'react';

interface AboutProps {
  age?: number,
  setAge?: (value: (((prevState: number) => number) | number)) => void
}

const About = ({age, setAge}: AboutProps) => {
  
  
  return (
    <div>
      age = {age}
      <button onClick={()=> setAge!(prev => prev + 1)}>Hey</button>
    </div>
  );
};

export default About;