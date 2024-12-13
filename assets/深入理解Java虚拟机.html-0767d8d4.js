import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as l}from"./app-3d4993ca.js";const r={},t=l('<h2 id="垃圾收集器" tabindex="-1"><a class="header-anchor" href="#垃圾收集器" aria-hidden="true">#</a> 垃圾收集器</h2><h3 id="cms" tabindex="-1"><a class="header-anchor" href="#cms" aria-hidden="true">#</a> CMS</h3><p>CMS（concurrent mark sweep 并发标记清除）收集器以获取最短回收停顿时间为目标，主要用于服务端，关注响应速度，希望停顿时间尽可能短，从而带来良好的用户体验</p><p>CMS基于<code>标记-清除</code>算法，CMS工作过程分为4个步骤：</p><ol><li>初始标记（会stop the world）</li><li>并发标记</li><li>重新标记（会stop the world）</li><li>并发清除</li></ol><p><strong>初始标记和重新标记</strong>会<code>stop the world</code>，初始标记会标记与<code>GC Roots</code>直接关联的对象，速度很快</p><p>并发标记就是从与<code>GC Roots</code>直接关联的对象开始，遍历整个树状图的过程，耗时较长，但是不需要停顿用户线程，因为它是并发的</p><p>重新标记是为了修正并发标记的结果，因为用户线程是一直运行的，并发标记的结果可能会产生变动，这个阶段的停顿时间通常比初始标记阶段长，但是远比并发标记阶段耗时短</p><p>并发清除，清除掉标记死亡的对象，由于采用<code>标记-清除</code>算法，不需要移动对象，该阶段也和用户线程并发执行</p><blockquote><p>但是CMS有3个明显的缺点：</p></blockquote><ol><li>对CPU资源敏感</li><li>无法处理<code>浮动垃圾</code></li><li>标记清除算法带来的内存碎片问题</li></ol><p>虽然CMS的垃圾收集工作能和用户线程并发执行，但是会占用CPU的计算处理能力，导致应用程序变慢，降低总吞吐量（CPU执行用户线程的时间变少了），CMS默认启动的垃圾回收线程数=（CPU核心数量+3）/4，当CPU核心数大于等于4，影响不大，但是如果CPU核心数小于4，如果应用已经让CPU负载很高了，但是还要分出一半的运算能力去进行垃圾收集工作，就会非常影响用户程序的执行速度</p><p>CMS在进行垃圾收集的时候，用户线程是在并发执行的，<strong>标记结束之后产生的新的垃圾对象称为浮动垃圾</strong>，CMS无法在此次垃圾收集处理它们，只能等到下一次收集再处理，浮动垃圾也是要占用内存空间的；另外，用户线程一直在运行，新对象也在产生，CMS必须预留一部分空间给用户线程，浮动垃圾占用内存可能导致没有足够的空间分配给新对象，就会导致<code>concurrent mode failure</code>问题，从而导致另一次完全stop the world的<code>Full GC</code>，反而会影响性能</p><p>标记清除算法，不会进行内存整理，会产生内存碎片，即使总的内存空间足够，但是没有连续的空间可供分配给大对象，也会导致<code>Full FC</code></p><p>已废弃：</p><p><code>-XX：+UseCMS-CompactAtFullCollection</code>参数可以控制Full GC之前进行内存整理的行为的开关</p><p><code>-XX：CM SFullGCsBefore-Compaction</code>参数可以控制几次不进行内存整理的Full GC后进行一次内存整理的Full GC</p><h3 id="g1" tabindex="-1"><a class="header-anchor" href="#g1" aria-hidden="true">#</a> G1</h3><p>在G1之前，其他垃圾收集器的垃圾收集范围要么是新生代（Minor GC），要么是老年代（Major GC），要么是整个Java堆（Full GC）。而<strong>G1可以对堆内存的任何部分来进行回收</strong>，衡量标准不再是哪个分代，而是哪块内存中存放的垃圾最多，回收收益最大，这就是G1的<code>Mixed GC</code>模式</p><p>G1把连续的Java堆划分为多个大小相等的区域（Region），每个Region都可以扮演新生代或老年代空间，收集器能够根据扮演角色的不同采用不同的策略去处理，<strong>Region是垃圾回收的最小单元，即每次收集到的内存空间为Region大小的整数倍</strong></p><p>G1维护一个优先级列表，会根据用户设定允许的收集停顿时间（<code>-XX：MaxGCPauseMillis</code>指定），优先处理回收价值大的Region（垃圾多的），保证G1在有限的时间内获取尽可能高的收集效率</p><blockquote><p>Region分类，和之前的分代中新生代老年代概念差不多</p></blockquote><p><strong>Eden Region</strong></p><ul><li>用途：Eden区是新对象分配的地方，当对象首次被创建，会被分配到Eden区</li><li>在GC时，大多数该区域中的对象都会被当作垃圾清除，因为大部分对象都是朝生夕死的</li></ul><p><strong>Survivor Region</strong></p><ul><li>用途：survivor区用于存放从Eden区和其他Survivor区中幸存下来的对象。这些对象在经历了一次或多次垃圾收集后仍然存活</li><li>特点：Survivor区有两种类型：一种是From区，另一种是To区。在垃圾收集过程中，对象会从From区复制到To区。复制完成后，From区和To区的角色会互换</li></ul><p><strong>Old Region</strong></p><ul><li>用途：Old区用于存放长时间存活的对象。当对象在Survivor区中存活了足够长的时间（超过了设定的阈值）后，它们就会被晋升到Old区</li><li>特点：Old区中的对象通常不会像Eden区或Survivor区中的对象那样频繁地被回收，因此，当Old区被回收时，通常需要更长的暂停时间</li></ul><p><strong>Humongous Region</strong>（译为 巨大的区域）</p><ul><li>用途：Humongous区用于存放非常大的对象，这些对象的大小超过了单个Region的一半</li><li>特点：为了存储这些大对象，G1会将连续的Region组合起来形成一个足够大的区域。这些区域的回收通常会在Full GC中处理</li></ul><p><strong>空闲 Region</strong></p><ul><li>用途：空闲区是指那些当前没有被使用的Region</li><li>特点：这些区域可以被视为资源池，用于未来的对象分配或者在GC过程中作为To区</li></ul><figure><img src="https://gitee.com/eddie-lucas/images/raw/master/img/image-20240518192505816.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>G1整体上基于<code>标记-整理</code>算法，局部看（两个region之间）基于<code>标记-复制</code>，G1工作过程分为4个步骤</p></blockquote><ol><li>初始标记（会stop the world）</li><li>并发标记</li><li>最终标记（会stop the world）</li><li>筛选回收（会stop the world）</li></ol><figure><img src="https://gitee.com/eddie-lucas/images/raw/master/img/image-20240518194941816.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',36),d=[t];function n(c,a){return e(),i("div",null,d)}const g=o(r,[["render",n],["__file","深入理解Java虚拟机.html.vue"]]);export{g as default};
