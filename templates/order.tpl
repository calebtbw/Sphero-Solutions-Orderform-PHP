{* Package *}
<div class="package-details">
  <img src="{$productImg}" alt="spherosolutions" width="70" height="70" />
  <h3 id="productheader">
    {$productinfo.name}
  </h3>
  <div class="flex align-center justify-center m-t-b-1">
    <div class="package-features">{$productinfo.shortDescription} •</div>
    <div class="package-price"> {$pricing.minprice.cycleText}</div>
  </div>
  <input type="hidden" name="location" id="wslocation" data-location="{$locationid}" value="{$location.id}">
  <div class="package-location"><span>{$location.name} Location •</span> <a
      href="https://spherosolutions.net/minecraft">Change</a>
  </div>
</div>


<div class="container">
  <div class="wsorder-box">
    <div class="alert alert-danger wsformerrors" role="alert">
      <div id="wserrormessage"></div>
    </div>
    <div class="alert alert-warning wssteps wsstep1" role="alert">
      <div class="ws7pad">Hello, <span id="wsclientusername"></span></div>
      <a class="wschangefirststep" href="#">Change Name</a>
    </div>
    <div class="alert alert-warning wssteps wsstep2" role="alert">
      <div class="ws7pad">You picked <b><span id="wstypemethod"></span></b> as the initial server type.</div>
      <a class="wschange2step" href="#">Change Type</a>
    </div>
    <div class="alert alert-warning wssteps wsstep3" role="alert">
      <div class="ws7pad">You are comfortable with <b><span id="wsslottarea"></span></b> player slots and you <b><span
            id="wsdatabasearea"></span></b>.</div>
      <a class="wschange3step" href="#">Change</a>
    </div>
    <div class="alert alert-warning wssteps wsstep4" role="alert">
      <div class="ws7pad">You can access your server via <b><span id="wsconnecttype"></span></b></div>
      <a class="wschange4step" href="#">Change</a>
    </div>
    <div class="alert alert-warning wssteps wsstep5" role="alert">
      <div class="ws7pad">You have selected <span id="wsaddonscount"></span> addons</div>
      <a class="wschange5step" href="#">Change</a>
    </div>
    <div class="wssteparea1 wssteparea">
      <h2>LET'S BEGIN WITH YOUR NAME!</h2>
      <p>Input your minecraft username here.</p>
      <div class="wsfirststep">
        <input type="text" name="username" id="wsusername" data-fid="{$usernameid}" size="20" placeholder="Herobrine"
          required="">
        <input type="button" class="wsfirststepbutton nextbutton" value="Next Step">
      </div>
    </div>
    <div class="wssteparea2 wssteparea" style="display: none">
      <h2>SELECT A SERVER TYPE</h2>
      <div class="ws2step">
        <input type="hidden" name="selectedserverid" id="selectedserverid" value="">
        <input type="hidden" name="serverids" id="serverids" value="{$serverid}">
        {*
                {foreach from=$servers.options item=serveritem}
                <div class="alert alert-warning wsselecttype" data-serverid='{$servers.id}' data-servertype='{$serveritem.id}' role="alert">
                <div class="wsservertypename"><img src="https://via.placeholder.com/150x80"> <h4>{$serveritem.name}</h4></div>
                <a href="#" data-name="{$serveritem.name}" data-serverid='{$servers.id}' data-servertype='{$serveritem.id}' class="wstypeselector">Select</a>
                </div>
                {/foreach}
                *}
        {assign var="i" value=0}
        {foreach from=$servers key=servertitle item=serveritem}
        <div class="wsoptionsrows">
          <div class="alert wsselecttype" data-havesub="{if count($serveritem) > 1}1{else}0{/if}"
            data-serverid='{$serverid}' data-servertype='{if count($serveritem) == 1}{$serveritem[0]['id']}{/if}'
            role="alert">
            <div class="wsservertypename"><img src="groupimage.php?id={$serveritem[0].id}">
              <h4>{$servertitle}</h4>
            </div>
            <a href="#" data-name="{$serveritem.name}" data-title="{$servertitle}"
              data-havesub="{if count($serveritem) > 1}{$i}{else}{/if}" data-serverid='{$servers.id}'
              data-servertype='{$serveritem[0].id}' class="wstypeselector">Select</a>
          </div>
          {if count($serveritem) > 1}
          <div class="wsserverssubs datasubitems{$i}" style="display: none">
            {foreach from=$serveritem item=opitem}
            <button data-id="{$opitem.id}" data-name="{$servertitle}: {$opitem.name}"
              class="btn btn-outline-info serveropsib">{$opitem.name}</button>
            {/foreach}
          </div>
          {/if}
        </div>
        {assign var="i" value=($i + 1)}
        {/foreach}
      </div>
    </div>
    <div class="wssteparea3 wssteparea" style="display: none">
      <div class="ws3step">
        <div class="row wsoptionals">
          <!-- Item -->
          <div class="col-md-6">
            <h2>UNLIMITED SLOTS?</h2>
            <div class="item wsselectoptions" data-configid='{$unlimitedslots['id']}'
              data-valueid='{$unlimitedslots['options'][0]['id']}' data-description="1">
              <div class="info-member">
                <div class="form-check">
                  <i class="fas fa-check-circle" style="display: none"></i>
                  <i class="far fa-circle"></i>
                  <h5>
                    Yes, make it unlimited! <br>
                    + {$unlimitedslots['options'][0]['name']}
                  </h5>
                </div <p class="desc">
                Set any amount of player slots as you wish.
                <br>
                Free on Premium Plans!
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h2>MYSQL DATABASE?</h2>
            <div class="item wsselectoptions" data-configid='{$mysqldatabase['id']}'
              data-valueid='{$mysqldatabase['options'][0]['id']}' data-description="2">
              <div class="info-member">
                <div class="form-check">
                  <i class="fas fa-check-circle" style="display: none"></i>
                  <i class="far fa-circle"></i>
                  <h5>
                    Yes, add a MySQL database!<br>
                    + {$mysqldatabase['options'][0]['recurring']|formatCurrency} Monthly
                  </h5>
                </div <p class="desc">
                MySQL Database is used to store server data.
                <br>
                Free on Premium Plans!
                </p>
              </div>
            </div>
          </div>
          <!-- Item -->
          <div class="col-md-12 wsopnext">
            <button href="#" class="opnextbutton">Next Step</button>
          </div>
        </div>
      </div>
    </div>
    <div class="wssteparea4 wssteparea" style="display: none">
      <div class="ws3step">
        <h2>ACCESS TYPE</h2>
        <div class="row wsoptionals access-type-blocks">
          <!-- Item -->
          <div class="col-md-6">
            <div class="item wsselectoptionsdomain" data-fid="{$subdomainid}" data-connect="Sub domain"
              data-domainrequired="1">
              <div class="info-member">
                <div class="form-check">
                  <i class="fas fa-check-circle" style="display: none"></i>
                  <i class="far fa-circle"></i>
                  <h5>
                    Subdomain
                  </h5>
                </div <p class="desc">
                We will configure a subdomain for your server, which is easy to remember and nice to look at.
                You can request one after ordering even if you did not select this option.
                <br><br>
                <div class="input-group mb-3">
                  <input type="text" id="wssubdomain" class="form-control" placeholder="Domain" aria-label="Domain">
                  <span class="input-group-text">.</span>
                  <select name="" id="wssubdomaintld" class="form-select">
                    <option>ssn.lol</option>
                    <option>ssn.onl</option>
                    <option>mcsrv.onl</option>
                    <option>mcsrv.me</option>
                    <option>spheros.me</option>
                  </select>
                </div>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="item wsselectoptionsdomain wsdomains21ctive" data-connect="IP with Port"
              data-domainrequired="0">
              <div class="info-member">
                <div class="form-check">
                  <i class="fas fa-check-circle"></i>
                  <i class="far fa-circle" style="display: none"></i>
                  <h5>
                    IP with Port
                  </h5>
                </div <p class="desc">
                We will provide you with an IP and a Port number regardless. Your users can access the server using the
                IP:Port configuration.
                </p>
              </div>
            </div>
          </div>
          <!-- Item -->
          <div class="col-md-12 wsopnext">
            <button href="#" class="op2nextbutton">Next Step</button>
          </div>
        </div>
      </div>
    </div>
    <div class="wssteparea5 wssteparea" style="display: none">
      <div class="ws5step">
        <h2>CHOOSE ADDONS</h2>
        {foreach from=$addons item=addon}
        <div class="alert wsselecttype wsselectaddons" data-addonid='{$addon.id}' role="alert">
          <div class="wsservertypename">
            <i class="fas fa-check-circle" style="display: none"></i>
            <i class="far fa-circle"></i>
            <div>
              <h5>{$addon.name} - {$addon.pricing}</h5>
              <p>{$addon.description}</p>
            </div>
          </div>
        </div>
        {/foreach}
        <div class="col-md-12 wsopnext">
          <button href="#" class="op3nextbutton">Final Step</button>
        </div>
      </div>
    </div>
    <div class="wssteparea6 wssteparea" style="display: none">
      <div class="ws6step">
        <h2>BILLING CYCLE</h2>
        <div class="row wscycles">
          {foreach from=$pricing.cycles item=pname key=ptype}
          <!-- Item -->
          <div class="col-md-3">
            <div class="item wsselectoptionscycles {if $ptype == 'monthly'}wscycleactive{/if}" data-domainrequired="1"
              data-cycle='{$ptype}'>
              <div class="info-member">
                <div class="form-check">
                  <i class="fas fa-check-circle" {if $ptype != 'monthly'} style="display: none" {/if}></i>
                  <i class="far fa-circle" {if $ptype == 'monthly'} style="display: none" {/if}></i>
                  <h3>
                    {$pname}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/foreach}
          <!-- Item -->
          <div class="col-md-12 wsopnext">
            <button class="opfinalnextbutton"><img class="wsajaxloader"
                src="{$systemurl}/order/assets/img/ajax-loader.gif">
              Review and
              Checkout</button>
          </div>
        </div>
      </div>
    </div>
    <div id="wsendpage" style="">

    </div>
  </div>
</div>