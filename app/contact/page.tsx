const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center indian-border pb-4 pt-2">
          <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Contact Us
          </span>
        </h1>
        <p className="text-center text-lg mb-8 hindi-text fade-in">
          हमसे जुड़ें और अपनी कविता की यात्रा शुरू करें
        </p>
        
        <div className="fade-in-delay-1">
          <p className="text-lg mb-6">
            At <strong className="text-primary">Kavyapath</strong>, we're committed to nurturing a vibrant community of Hindi poetry enthusiasts. Whether you're a poet looking to share your work or a reader with questions or feedback, we'd love to hear from you.
          </p>
        </div>

        <section className="my-10 fade-in-delay-1 bg-card p-8 rounded-lg shadow-sm border border-border/40">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="h-5 w-1 bg-primary rounded-full mr-3"></span>
            Poetry Submissions
          </h2>
          <p className="text-lg mb-4">
            Kavyapath welcomes submissions from poets of all levels who are passionate about Hindi poetry. Our platform celebrates both traditional and contemporary forms of poetic expression.
          </p>
          <p className="text-lg mb-4">
            When submitting your poetry, please include:
          </p>
          <ul className="list-disc list-inside text-lg mb-6 space-y-2 pl-4">
            <li>The style or form of poetry (e.g., Ghazal, Doha, Free Verse, etc.)</li>
            <li>A brief description or context for your poem (optional)</li>
            <li>Your preferred pen name for publication</li>
          </ul>
          <p className="text-lg mb-4">
            You can submit your poetry through our platform after registering, or via email at: <a href="mailto:submissions@kavyapath.in" className="text-primary hover:text-primary/90 underline">submissions@kavyapath.in</a>
          </p>
        </section>

        <section className="my-10 fade-in-delay-2 bg-card p-8 rounded-lg shadow-sm border border-border/40">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="h-5 w-1 bg-primary rounded-full mr-3"></span>
            Support & Feedback
          </h2>
          <p className="text-lg mb-4">
            We're constantly working to improve Kavyapath and would appreciate your thoughts on how we can better serve the Hindi poetry community. For any technical issues, suggestions, or general feedback, please contact us at: <a href="mailto:support@kavyapath.in" className="text-primary hover:text-primary/90 underline">support@kavyapath.in</a>
          </p>
          <p className="text-lg mb-4">
            Our team is dedicated to creating the best possible experience for poets and readers alike, and your input is invaluable in helping us achieve this goal.
          </p>
        </section>

        <section className="my-10 fade-in-delay-3 bg-card p-8 rounded-lg shadow-sm border border-border/40">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="h-5 w-1 bg-primary rounded-full mr-3"></span>
            Join Our Community
          </h2>
          <p className="text-lg mb-4">
            Connect with fellow poetry enthusiasts and stay updated on new features and poetry:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-accent/30 text-center">
              <p className="font-medium mb-2">Follow us on Social Media</p>
              <p className="text-muted-foreground">@kavyapath_poetry</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30 text-center">
              <p className="font-medium mb-2">Subscribe to Newsletter</p>
              <p className="text-muted-foreground">Monthly poetry selections</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-12 fade-in-delay-3">
          <p className="text-xl font-semibold mb-2 hindi-text">
            आपकी कविता, आपकी आवाज़, हमारा समुदाय
          </p>
          <p className="text-lg text-muted-foreground">
            (Your poetry, your voice, our community)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
