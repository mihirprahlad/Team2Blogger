import Gallery from "./Gallery";

const aboutTextStyle = {
  marginLeft: "-30px",
  fontSize: 20,
  marginRight: "100px",
};
const historyHeaderStyle = {
  marginLeft: "-30px",
  marginBottom:"-0px",
  fontSize:"80px"
};

const historyTextStyle = {
  marginLeft: "-30px",
  fontSize: 24,
};

export default function About() {
  return (
    <div class="page-wrapper">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <Gallery />
        </div>
        <div class="col">
          <div>
            <h1 style={historyHeaderStyle}>ABOUT.</h1>
            <div
              style={{
                marginLeft: "-30px",
                marginBottom: 20,
                height: 15,
                width: 300,
                backgroundColor: "#4C6357",
              }}
            ></div>
            <p style={aboutTextStyle}>
              Camille is a recent college graduate from UVA currently traveling
              from city to city exploring what urban life offers while taking
              advantage of any opportunity to get back to the great outdoors.
              Educated as a chemical engineer, Camille threw that into the wind
              to pursue software development and adventure. Exclusively working
              for new start-ups as a freelancer, she has been able to have
              extended stays in NYC, Denver, San Francisco, Seattle, and
              Barcelona. She hopes to go next to Austin or London, but, in
              truth, with her, you never know where she'll be next. She loves
              being a digital nomad because each new city brings new stories and
              opportunities.{" "}
            </p>
            <p style={aboutTextStyle}>
              Camille is a Virgo Libra cusp. Her hobbies include hiking,
              climbing, yoga, snowboarding, and anything with music. Her
              favorite parts of nature are trees, mountains, and rivers; her
              favorite parts of cities are music and rooftops.{" "}
            </p>
            <p style={historyTextStyle}></p>
          </div>
        </div>
      </div>
    </div>
  );
}
