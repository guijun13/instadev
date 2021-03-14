import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternaScreen({ category, question }) {
  return <FAQQuestionScreen question={question} category={category} />;
}

FAQInternaScreen.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternaScreen);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch(
    'https://instalura-api.vercel.app/api/content/faq'
  ).then(async (serverResponse) => {
    const response = await serverResponse.json();
    return response.data;
  });

  const pageData = faqCategories.reduce(
    (accumulator, faqCategory) => {
      const foundQuestion = faqCategory.questions.find((question) => {
        if (question.slug === params.slug) {
          return true;
        }
        return false;
      });

      if (foundQuestion) {
        return {
          ...accumulator,
          category: faqCategory,
          question: foundQuestion,
        };
      }
      return accumulator;
    },
    // { category: {}, question: {} }
    {}
  );

  return {
    props: {
      category: pageData.category,
      question: pageData.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: pageData.question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch(
    'https://instalura-api.vercel.app/api/content/faq'
  ).then(async (serverResponse) => {
    const response = await serverResponse.json();
    return response.data;
  });

  const paths = faqCategories.reduce((accumulator, faqCategory) => {
    const questionsPaths = faqCategory.questions.map((question) => {
      const questionSlug = question.slug;
      return { params: { slug: questionSlug } };
    });

    return [...accumulator, ...questionsPaths];
  }, []);

  return {
    // paths: [
    //   // Cada objeto representa uma página -> rota
    //   // o 'slug' é do [slug].js, nao do objeto {question}
    //   { params: { slug: 'qual-e-a-raiz-quadrada-de-2' } },
    // ],
    paths,
    fallback: false,
  };
}
