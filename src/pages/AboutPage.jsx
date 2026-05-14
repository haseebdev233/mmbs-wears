function AboutPage() {
  return (
    <main className="container py-4 py-lg-5">
      <section className="glass-panel rounded-5 p-4 p-lg-5 mb-4">
        <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">About MMB&apos;s Wears</div>
        <h1 className="display-6 fw-bold mb-3 text-white">Future-driven luxury fashion experience</h1>
        <p className="text-white-75 mb-0">
          MMB&apos;s Wears combines premium fashion aesthetics with modern commerce technology: animated experiences, AI-driven
          recommendations, custom sizing workflows, and immersive 3D previews.
        </p>
      </section>

      <section className="row g-4">
        {[
          {
            title: 'Premium Craftsmanship',
            copy: 'Every collection is designed for elevated comfort, fit precision, and standout visual identity.',
          },
          {
            title: 'Technology First',
            copy: 'From AI suggestion flows to 3D previews, every touchpoint is engineered for interactive shopping.',
          },
          {
            title: 'Customer-Centric Fit',
            copy: 'Custom model workflows and measurement-driven recommendations make every order feel tailored.',
          },
        ].map((item) => (
          <div className="col-md-4" key={item.title}>
            <div className="glass-panel rounded-4 p-4 h-100">
              <h2 className="h5 fw-bold text-white mb-2">{item.title}</h2>
              <p className="text-white-75 mb-0">{item.copy}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default AboutPage
