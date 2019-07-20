import React from "react";
import { primaryText, primary } from "../Res/Colors";
import { Icon, Button, Footer, FooterTab } from "native-base";

export default () => {
  return (
    <Footer>
      <FooterTab style={{ backgroundColor: primaryText }}>
        <Button>
          <Icon name="home" style={{ color: primary, fontSize: 32 }} />
        </Button>
        <Button>
          <Icon
            type="FontAwesome"
            name="plus-square-o"
            style={{ color: primary, fontSize: 32 }}
          />
        </Button>
        <Button>
          <Icon name="person" style={{ color: primary, fontSize: 32 }} />
        </Button>
      </FooterTab>
    </Footer>
  );
};
