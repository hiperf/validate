import{_ as a,c as i,o as s,a3 as t}from"./chunks/framework.BoN8Y8aW.js";const g=JSON.parse('{"title":"min","description":"","frontmatter":{},"headers":[],"relativePath":"validators/min.md","filePath":"validators/min.md"}'),n={name:"validators/min.md"},e=t(`<h1 id="min" tabindex="-1">min <a class="header-anchor" href="#min" aria-label="Permalink to &quot;min&quot;">​</a></h1><p><a name="min"></a></p><h2 id="min-datavalue-validatorconfigvalue-⇒-boolean" tabindex="-1">min(dataValue, validatorConfigValue) ⇒ <code>boolean</code> <a class="header-anchor" href="#min-datavalue-validatorconfigvalue-⇒-boolean" aria-label="Permalink to &quot;min(dataValue, validatorConfigValue) ⇒ &lt;code&gt;boolean&lt;/code&gt;&quot;">​</a></h2><p>Check that number is &gt;= min value</p><p><strong>Kind</strong>: global function</p><table tabindex="0"><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>dataValue</td><td><code>number</code></td><td>input value</td></tr><tr><td>validatorConfigValue</td><td><code>number</code></td><td>min expected value</td></tr></tbody></table><p><strong>Example</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> min </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@hiperf/validate/min&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// false</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// true</span></span></code></pre></div>`,8),l=[e];function h(d,p,o,r,k,c){return s(),i("div",null,l)}const E=a(n,[["render",h]]);export{g as __pageData,E as default};