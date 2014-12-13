<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
	<% _.forEach(sitemap.maps, function(list, changefreq){ %>
  	<% _.forEach(list, function(data){ %>	
	<url>
	  <loc><%- data.hreflang ? url.resolve(baseUrl, path.join(data.hreflang[0] === 'mm' ? 'my' : data.hreflang[0], data.loc)) : url.resolve(baseUrl, data.loc) %></loc>
	  <lastmod><%- data.lastmod || lastmod %></lastmod>
	  <changefreq><%- changefreq %></changefreq>
	  <% _.forEach(data.hreflang, function(lang) { %> 
	  <xhtml:link rel="alternate" hreflang="<%- lang %>" href="<%- url.resolve(baseUrl, path.join(lang === 'mm' ? 'my' : lang, data.loc)) %>" />
	  <% }) %>
	</url>
		<% }) %>
  <% }) %>
</urlset>