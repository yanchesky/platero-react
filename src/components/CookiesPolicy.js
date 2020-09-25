import React          from 'react'
import { connect }    from 'react-redux'
import styled         from 'styled-components'

import Heading        from 'components/Heading'

const Paragraph = styled.p`
  letter-spacing: 0.1em;
  font-size: 14px;
  margin: 15px 0;
  color: #a3a9ac;
  font-weight: 500;
  text-decoration: ${props => props.underline ? "underline" : "none"};
`

const CookiesPolicy = ({ lang }) => {
  if(lang === "es"){
    return (
      <>
        <Heading>Política de privacidad</Heading>
        <Paragraph underline>¿Qué es la ‘información personal’?</Paragraph>

        <Paragraph>La información se considera personal cuando dice algo sobre un ser humano que es o puede ser (únicamente) identificado. Esta definición procede del derecho europeo y es intencionadamente amplia con el fin de proporcionar un alto nivel de protección en el ámbito de la privacidad.</Paragraph>

        <Paragraph>Esto significa, por ejemplo, que no solo los nombres y las direcciones de correo electrónico pueden ser información personal, sino también números u otros tipos de identificadores, como su dirección IP, en la medida en que vinculen otra información (o informaciones) a un ser humano concreto.</Paragraph>

        <Paragraph underline>Recopilación de datos</Paragraph>

        <Paragraph>La web de Miguel Platero no recopila ninguna información personal sobre sus visitantes. Esta es una condición esencial para salvaguardar la privacidad. Si no se recopila información personal, no se puede robar, filtrar o exponer.</Paragraph>
        <Paragraph>Cuando visita la web de Miguel Platero, no registramos su dirección IP ni tampoco registramos el navegador.</Paragraph>
        <Paragraph>Esta política de recopilación de datos personales cero protege su privacidad, ya que su IP, navegador y plataforma se puede combinar con otros datos para identificar de forma precisa su ordenador, su ubicación o a usted mismo.</Paragraph>
      </>
    )
  }
  return (
    <>
      <Heading>Privacy policy</Heading>
      <Paragraph underline>What is ‘personal data’?</Paragraph>

      <Paragraph>Personal data are data that identify a specific individual. This definition is derived from European law and is intentionally broad in order to provide a high level of privacy protection.</Paragraph>

      <Paragraph>This means, for example, that not only names and email addresses may be personal data, but also numbers or other types of identifiers, such as your IP address, to the extent that they link other information (or information) to a specific individual.</Paragraph>

      <Paragraph underline>Data collection</Paragraph>

      <Paragraph>Miguel Platero's website does not collect any personal data of visitors. This is an essential condition to safeguard privacy. If personal data are not collected, they may not be stolen, filtered or exposed to threat.</Paragraph>
      <Paragraph>When you visit Miguel Platero's website, we do not register your IP address nor do we register the browser.</Paragraph>
      <Paragraph>This zero personal data collection policy protects your privacy, since your IP, browser and platform can be combined with other data to accurately identify your computer, your location or yourself.</Paragraph>
    </>
  )
}

export default connect(({ lang }) => ({ lang }))(CookiesPolicy);
