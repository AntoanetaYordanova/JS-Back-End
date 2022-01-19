module.exports = (body, title = 'Welcome') => `<html>
<head>
    <title>${title}</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/catalog">Catalog</a>
    </nav>
    ${body}
</body>
</html>`