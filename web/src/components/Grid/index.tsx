import React from "react";

import { Container, Section } from "./styles";

const Grid: React.FC = () => {
  return (
    <Container>
      <Section className="el1 hasImage">
        <div>
          <img src="https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="More status" />
        </div>
        <div>
          <h3>Lorem, ipsum</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            quos cumque sint quasi dolorum praesentium cum velit. Nisi, aperiam
            eligendi. Ab corrupti vitae nobis, reprehenderit nisi autem id in
            inventore.
          </p>
        </div>
      </Section>

      <Section className="el2">
        
      </Section>
      
      <Section className="el3 hasImage">
        <div>
          <img src="https://images.pexels.com/photos/1122530/pexels-photo-1122530.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="More status" />
        </div>
        <div>
          <h3>Lorem, ipsum</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            quos cumque sint quasi dolorum praesentium cum velit. Nisi, aperiam
            eligendi.
          </p>
        </div>
      </Section>

      <Section className="el4">
        <div>
          <h3>Lorem, ipsum</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            quos cumque sint quasi dolorum praesentium cum velit. Nisi, aperiam
            eligendi. 
          </p>
        </div>
      </Section>

      <Section className="el5">
       
      </Section>

      <Section className="el6">
      </Section>
    </Container>
  );
};

export default Grid;
