import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-3d4993ca.js";const p={},t=e(`<h2 id="spring使用回顾" tabindex="-1"><a class="header-anchor" href="#spring使用回顾" aria-hidden="true">#</a> Spring使用回顾</h2><p>Spring是一个容器，我们将对象的创建工作交给它，在需要使用对象时，直接从Spring中拿就可以了，刚入门Spring的时候，写过的最简单的从容器中获取对象的代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 配置类注册进IoC容器</span>
		<span class="token class-name">ApplicationContext</span> applicationContext <span class="token operator">=</span> 
            <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">SpringConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">UserService</span> userService <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">UserService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		userService<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，体现了Spring中非常重要的容器的概念，因此，接下来开始创建自己的容器</p><h2 id="创建容器" tabindex="-1"><a class="header-anchor" href="#创建容器" aria-hidden="true">#</a> 创建容器</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContext</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Class</span> configClass<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">Class</span> configClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>configClass <span class="token operator">=</span> configClass<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">//暂时为null，防止报错</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该容器根据配置类去创建，因此构造方法的参数为配置类</p><h2 id="componentscan注解" tabindex="-1"><a class="header-anchor" href="#componentscan注解" aria-hidden="true">#</a> ComponentScan注解</h2><p>通常，在配置类中需要指明包扫描的路径，这个注解常见于启动类上面，因为启动类也是一个配置类</p>`,9),c=[t];function o(i,l){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","Spring启动及扫描流程.html.vue"]]);export{d as default};
