import React, { Component }     from 'react';
import {connect}                from "react-redux";

import { CommingSoon }          from "styledComponents";
import { misc }                 from "../lang";

class RedirectComponent extends Component {
  componentDidMount() {
    window.location.href = "https://dev.platero.eu/wp-login.php"
  }

  render() {
    const { lang } = this.props;
    return (
      <CommingSoon>
        {misc.redirecting[lang]}
      </CommingSoon>
    );
  }
}
export default connect(({ lang }) => ({ lang }), null)(RedirectComponent);