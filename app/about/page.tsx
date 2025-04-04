const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center indian-border pb-4 pt-2">
          <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            About Kavyapath
          </span>
        </h1>
        
        <div className="fade-in">
          <p className="text-lg mb-6 hindi-text">
            Welcome to <strong className="text-primary">Kavyapath</strong>, a digital sanctuary dedicated to the beauty and richness of Hindi poetry. Our platform celebrates the lyrical tradition of Hindi verse while embracing modern digital expression.
          </p>
          <p className="text-lg mb-6">
            Born from a deep appreciation for the timeless art of Hindi poetry, Kavyapath aims to bridge the gap between classical poetic traditions and contemporary voices, creating a space where both can flourish and inspire.
          </p>
        </div>
        
        <section className="my-10 fade-in-delay-1">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="h-5 w-1 bg-primary rounded-full mr-3"></span>
            For Poets
          </h2>
          <p className="text-lg mb-4">
            Kavyapath provides a dedicated platform for poets of all levels to share their Hindi poems with a community that appreciates the artistry of words. Whether you're an established poet or just beginning to explore the rhythm and beauty of Hindi verse, our intuitive writing tools and supportive environment will help you craft and showcase your poetic expressions.
          </p>
          <p className="text-lg mb-4">
            We believe that poetry is meant to be shared, and our platform makes it easy for your voice to reach appreciative readers who understand the nuances of Hindi poetry.
          </p>
        </section>
        
        <section className="my-10 fade-in-delay-2">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="h-5 w-1 bg-primary rounded-full mr-3"></span>
            For Readers
          </h2>
          <p className="text-lg mb-4">
            Discover the rich tapestry of emotions and perspectives woven through Hindi poetry. Our curated collection spans various styles and themes—from traditional forms like ghazals and dohas to contemporary free verse. Each poem offers a window into the poet's world, inviting you to experience the depth and beauty of Hindi literary expression.
          </p>
          <p className="text-lg mb-4">
            As a reader, you can explore works by category, engage with poets through comments, and save your favorite poems for future inspiration.
          </p>
        </section>
        
        <section className="my-10 fade-in-delay-3">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="h-5 w-1 bg-primary rounded-full mr-3"></span>
            Our Vision
          </h2>
          <p className="text-lg mb-4">
            Kavyapath envisions a thriving digital community that preserves and evolves the tradition of Hindi poetry. We aim to:
          </p>
          <ul className="list-disc list-inside text-lg mb-4 space-y-2 pl-4">
            <li>Create an accessible archive of contemporary Hindi poetry</li>
            <li>Foster meaningful connections between poets and readers</li>
            <li>Promote the beauty and versatility of the Hindi language</li>
            <li>Provide a nurturing space for poetic expression and appreciation</li>
          </ul>
        </section>
        
        <div className="text-center mt-12 bg-accent/30 p-8 rounded-lg fade-in-delay-3">
          <p className="text-xl font-semibold mb-4 hindi-text">
            हर शब्द एक यात्रा है, हर कविता एक कहानी
          </p>
          <p className="text-lg">
            (Every word is a journey, every poem a story)
          </p>
          <p className="mt-6">
            Join us on this poetic journey—whether you're here to compose, read, or simply appreciate the artistry of Hindi poetry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;