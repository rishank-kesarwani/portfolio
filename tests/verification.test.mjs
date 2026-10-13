import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('1. Production Domain Consistency Check', () => {
  const robotsContent = fs.readFileSync(path.join(projectRoot, 'app/robots.ts'), 'utf8');
  const sitemapContent = fs.readFileSync(path.join(projectRoot, 'app/sitemap.ts'), 'utf8');
  const layoutContent = fs.readFileSync(path.join(projectRoot, 'app/layout.tsx'), 'utf8');

  // Verify correct domain is used
  assert.ok(
    robotsContent.includes('https://www.rishankkesarwani.com/sitemap.xml'),
    'robots.ts must reference https://www.rishankkesarwani.com/sitemap.xml'
  );
  assert.ok(
    sitemapContent.includes('const siteUrl = "https://www.rishankkesarwani.com";'),
    'sitemap.ts must use https://www.rishankkesarwani.com'
  );
  assert.ok(
    layoutContent.includes('const siteUrl = "https://www.rishankkesarwani.com";'),
    'layout.tsx must use https://www.rishankkesarwani.com'
  );

  // Verify the misspelled domain with 'h' is completely eliminated
  assert.strictEqual(
    robotsContent.includes('rishankkesharwani.com'),
    false,
    'robots.ts must NOT contain misspelled domain'
  );
  assert.strictEqual(
    sitemapContent.includes('rishankkesharwani.com'),
    false,
    'sitemap.ts must NOT contain misspelled domain'
  );
  assert.strictEqual(
    layoutContent.includes('rishankkesharwani.com'),
    false,
    'layout.tsx must NOT contain misspelled domain'
  );
});

test('2. Ads.txt Route and File Verification', () => {
  const staticAdsTxt = fs.readFileSync(path.join(projectRoot, 'public/ads.txt'), 'utf8');
  const routeAdsTxt = fs.readFileSync(path.join(projectRoot, 'app/ads.txt/route.ts'), 'utf8');

  const expectedEntry = 'google.com, pub-6553969348835282, DIRECT, f08c47fec0942fa0';

  assert.ok(staticAdsTxt.includes(expectedEntry), 'public/ads.txt must contain publisher ID pub-6553969348835282');
  assert.ok(routeAdsTxt.includes(expectedEntry), 'app/ads.txt/route.ts must return publisher ID pub-6553969348835282');
});

test('3. Case Studies Data & Route Completeness', async () => {
  // Read case studies file
  const caseStudiesFile = fs.readFileSync(path.join(projectRoot, 'data/case-studies.ts'), 'utf8');

  const expectedSlugs = [
    'ai-platform',
    'notification-service',
    'model-regression-detection',
    'ai-pr-review',
    'production-reporting-database-optimization',
    'ai-travel-planner',
  ];

  for (const slug of expectedSlugs) {
    assert.ok(
      caseStudiesFile.includes(`slug: "${slug}"`),
      `case-studies.ts must define case study with slug: ${slug}`
    );
  }

  // Verify dynamic route files exist
  assert.ok(fs.existsSync(path.join(projectRoot, 'app/case-studies/page.tsx')), 'app/case-studies/page.tsx must exist');
  assert.ok(fs.existsSync(path.join(projectRoot, 'app/case-studies/[slug]/page.tsx')), 'app/case-studies/[slug]/page.tsx must exist');
});

test('4. Engineering Notes Data & Route Completeness', async () => {
  const notesFile = fs.readFileSync(path.join(projectRoot, 'data/engineering-notes.ts'), 'utf8');

  const expectedNoteSlugs = [
    'designing-retryable-background-jobs',
    'evaluating-llm-changes-regression-gates',
    'tenant-aware-authorization-ai-microservices',
    'resilient-llm-routing-timeouts-fallbacks',
    'database-indexing-query-performance-optimization',
  ];

  for (const slug of expectedNoteSlugs) {
    assert.ok(
      notesFile.includes(`slug: "${slug}"`),
      `engineering-notes.ts must define article with slug: ${slug}`
    );
  }

  // Verify route files exist
  assert.ok(fs.existsSync(path.join(projectRoot, 'app/engineering-notes/page.tsx')), 'app/engineering-notes/page.tsx must exist');
  assert.ok(fs.existsSync(path.join(projectRoot, 'app/engineering-notes/[slug]/page.tsx')), 'app/engineering-notes/[slug]/page.tsx must exist');
});

test('5. AdBanner Placement Policy Compliance', () => {
  const homePageContent = fs.readFileSync(path.join(projectRoot, 'app/page.tsx'), 'utf8');
  const adBannerContent = fs.readFileSync(path.join(projectRoot, 'components/ads/AdBanner.tsx'), 'utf8');

  // AdBanner must be removed from homepage navigation
  assert.strictEqual(
    homePageContent.includes('<AdBanner'),
    false,
    'Homepage (app/page.tsx) must NOT render AdBanner on portfolio navigation view'
  );

  // AdBanner component must require valid client ID and editorial page gating
  assert.ok(
    adBannerContent.includes('isEditorialPage'),
    'AdBanner must support isEditorialPage gating'
  );
  assert.ok(
    adBannerContent.includes('ca-pub-'),
    'AdBanner must validate publisher ID format'
  );
});

test('6. Trust, Policy and Compliance Routes Exist', () => {
  const requiredRoutes = [
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'app/privacy-policy/page.tsx',
    'app/terms/page.tsx',
    'app/affiliate-disclosure/page.tsx',
    'app/projects/page.tsx',
    'app/not-found.tsx',
  ];

  for (const relPath of requiredRoutes) {
    assert.ok(
      fs.existsSync(path.join(projectRoot, relPath)),
      `Required route ${relPath} must exist`
    );
  }
});

test('7. Navigation and Footer Integration', () => {
  const navbarContent = fs.readFileSync(path.join(projectRoot, 'components/Navbar.tsx'), 'utf8');
  const footerContent = fs.readFileSync(path.join(projectRoot, 'components/Footer.tsx'), 'utf8');

  // Navbar must include Case Studies and Engineering Notes
  assert.ok(navbarContent.includes('/case-studies'), 'Navbar must link to /case-studies');
  assert.ok(navbarContent.includes('/engineering-notes'), 'Navbar must link to /engineering-notes');
  assert.ok(navbarContent.includes('/about'), 'Navbar must link to /about');
  assert.ok(navbarContent.includes('/contact'), 'Navbar must link to /contact');

  // Footer must link to policies and editorial sections
  assert.ok(footerContent.includes('/privacy-policy'), 'Footer must link to /privacy-policy');
  assert.ok(footerContent.includes('/terms'), 'Footer must link to /terms');
  assert.ok(footerContent.includes('/affiliate-disclosure'), 'Footer must link to /affiliate-disclosure');
  assert.ok(footerContent.includes('/case-studies'), 'Footer must link to /case-studies');
  assert.ok(footerContent.includes('/engineering-notes'), 'Footer must link to /engineering-notes');
});
