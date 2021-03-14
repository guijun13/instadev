import React from 'react';
import PropTypes from 'prop-types';
import FAQScreen from '../../src/components/screens/FAQScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQ({ faqCategories }) {
  /* Se fosse feito a request em React puro
  const [faqCategories, setFaqCategories] = useState([]);

  useEffect(() => {
    fetch('https://instalura-api.vercel.app/api/content/faq')
      .then((serverResponse) => serverResponse.json())
      .then((convertedResponse) => convertedResponse.data)
      .then((response) => {
        setFaqCategories(response);
      });
  }, []);
  */

  return <FAQScreen faqCategories={faqCategories} />;
}

export default websitePageHOC(FAQ, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'FAQ',
    },
  },
});

// Next.js já faz o pré-request da API ao utilizar o getStaticProps, assim o
// conteúdo aparece juntamente com o resto da página
export async function getStaticProps() {
  const faqCategories = await fetch(
    'https://instalura-api.vercel.app/api/content/faq'
  )
    .then((serverResponse) => serverResponse.json())
    .then((convertedResponse) => convertedResponse.data);

  return {
    props: {
      faqCategories,
    }, // will be passed to the page component as props
  };
}

FAQ.propTypes = {
  faqCategories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          slug: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};
