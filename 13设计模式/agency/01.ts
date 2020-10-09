export { }

interface Star{
  answerPhone(): void;
}

class Angelababy implements Star{
  available:boolean = true
  answerPhone(): void {
    console.log('您好,我是Angelababy')
  };
}

class AngelababyAgent implements Star{
  constructor(private anaelababy:Angelababy) { 

  }
  answerPhone(): void {
    console.log('您好,我是经纪人')
    if (this.anaelababy.available) { 
      this.anaelababy.answerPhone()
    }
  }
  
}

let angelababy = new Angelababy()
let angelababyAgent = new AngelababyAgent(angelababy)
angelababyAgent.answerPhone()        
/* 

  您好,我是经纪人
  您好,我是Angelababy
*/