<script lang="ts">
  import { base } from '$app/paths';
  import { lectures } from '$lib/lectures';
  import { canonicalFor, site } from '$lib/site';

  const canonical = canonicalFor();
</script>

<svelte:head>
  <title>Lecture Decks | {site.title}</title>
  <meta name="description" content={site.description} />
  {#if canonical}<link rel="canonical" href={canonical} />{/if}
</svelte:head>

<a class="skip-link" href="#main-content">Skip to main content</a>

<div class="index-shell">
  <header class="index-masthead">
    <div class="masthead-inner container">
      <span class="school-name">{site.school}</span>
      <span class="course-code">{site.courseCode}</span>
    </div>
  </header>

  <main id="main-content" tabindex="-1">
    <section class="index-hero">
      <div class="container">
        <p class="hero-eyebrow">Lecture decks · Fall 2026</p>
        <h1>Truth-Telling 101 <span>Artists Meet Data Journalism</span></h1>
        <p class="hero-description">
          A flexible home for questions, evidence, and the stories you will tell with them.
        </p>
      </div>
    </section>

    <section class="lecture-section container" aria-labelledby="lecture-heading">
      <div class="section-heading">
        <div>
          <p class="section-eyebrow">Start here</p>
          <h2 id="lecture-heading">Sample lectures</h2>
        </div>
        <p>
          These are examples, not scheduled class sessions. Replace them as your lectures take
          shape.
        </p>
      </div>

      <ol class="lecture-list">
        {#each lectures as lecture (lecture.slug)}
          <li>
            <a class="lecture-card" href={`${base}/lectures/${lecture.slug}/`}>
              <span class="lecture-number">Example {lecture.number}</span>
              <span class="lecture-title">{lecture.title}</span>
              <span class="lecture-description">{lecture.description}</span>
              <span class="lecture-open">Open slides <span aria-hidden="true">↗</span></span>
            </a>
          </li>
        {/each}
      </ol>
    </section>
  </main>

  <footer class="index-footer">
    <div class="container">
      <span>{site.title}</span>
      <span>Ben Welsh · {site.school}</span>
    </div>
  </footer>
</div>
