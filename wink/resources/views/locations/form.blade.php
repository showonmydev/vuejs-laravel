<div class="row">
    <div class="col-md-6">

        {!! Form::hidden('street_number', null, array('id' => 'street_number', 'class' => '', 'required' => '')) !!}
        {!! Form::hidden('street', null, array('id' => 'route', 'class' => '', 'required' => '')) !!}
        {!! Form::hidden('suburb', null, array('id' => 'sublocality_level_2', 'class' => '', 'required' => '')) !!}
        {!! Form::hidden('city', null, array('id' => 'locality', 'class' => '', 'required' => '')) !!}
        {!! Form::hidden('postal_code', null, array('id' => 'postal_code', 'class' => '', 'required' => '')) !!}
        {!! Form::hidden('province', null, array('id' => 'administrative_area_level_1', 'class' => '', 'required' => '')) !!}
        {!! Form::hidden('country', null, array('id' => 'country', 'class' => '', 'required' => '')) !!}

        <div class="form-group @if ($errors->has('name')) has-error @endif">
            {!! Form::label('name', 'Name', array('class' => 'control-label')) !!}
            {!! Form::text('name', null, array('class' => 'form-control pad', 'placeholder' => 'Name', 'required' => '', 'onFocus' => 'geolocate()')) !!}
            @if ($errors->has('name')) <p class="help-block">{{ $errors->first('name') }}</p> @endif
        </div>

        <div class="form-group @if ($errors->has('address')) has-error @endif">
            {!! Form::label('autocomplete', 'Address', array('class' => 'control-label')) !!}
            <div id="locationField">
                {!! Form::text('address', null, array('id' => 'autocomplete', 'class' => 'form-control pad', 'placeholder' => 'Address', 'required' => '')) !!}
            </div>
            @if ($errors->has('address')) <p class="help-block">{{ $errors->first('address') }}</p> @endif
        </div>

        <div class="row">

            <div class="form-group col-md-6">
                {!! Form::label('latitude', 'Latitude', array('class' => 'control-label')) !!}
                {!! Form::text('latitude', null, array('class' => 'form-control pad', 'placeholder' => 'Latitude')) !!}
                @if ($errors->has('latitude')) <p class="help-block">{{ $errors->first('latitude') }}</p> @endif
            </div>
            <div class="form-group col-md-6">
                {!! Form::label('longitude', 'Longitude', array('class' => 'control-label')) !!}
                {!! Form::text('longitude', null, array('class' => 'form-control pad', 'placeholder' => 'Longitude')) !!}
                @if ($errors->has('longitude')) <p class="help-block">{{ $errors->first('longitude') }}</p> @endif
            </div>

        </div>

        @if ($location)

            <div class="form-group @if ($errors->has('tags')) has-error @endif">
                <label for="task_name" class="control-label campaign__form-label">Tags <span>You can make multiple selections</span></label>
                <select id="tags" multiple="1" class="styled tags" style="width: 100%;" name="tags[]">
                    <optgroup label="Tags">

                        @foreach($tags as $tag)
                            @if (count($location->tags))
                                @foreach ($location->tags as $tagLocation)

                                    @if($tagLocation->pivot->tag_id === $tag->id)
                                        <option value="{{ $tag->id }}" selected>{{$tag->name}}</option>
                                    @else
                                        <option value="{{ $tag->id }}">{{$tag->name}}</option>
                                    @endif
                                @endforeach
                            @else
                                <option value="{{ $tag->id }}">{{$tag->name}}</option>
                            @endif

                        @endforeach

                    </optgroup>
                </select>

                @if ($errors->has('tags')) <p class="help-block">{{ $errors->first('tags') }}</p> @endif
            </div>

            <div class="form-group @if ($errors->has('brands')) has-error @endif">
                <label for="task_name" class="control-label campaign__form-label">Brands <span>You can make multiple selections</span></label>

                <select id="brands" multiple="1" class="styled brands" style="width: 100%;" name="brands[]">
                    <optgroup label="Brands">

                        @foreach($brands as $brand)
                            <option value="{{ $brand->id }}"
                            @if (count($location->brands))
                                @foreach ($location->brands as $brandLocation)
                                    @if($brandLocation->pivot->brand_id === $brand->id)
                                        selected
                                    @endif
                                @endforeach
                            @endif
                            >{{$brand->name}}</option>
                        @endforeach

                    </optgroup>
                </select>

                @if ($errors->has('brands')) <p class="help-block">{{ $errors->first('brands') }}</p> @endif
            </div>
        @else
            <div class="form-group @if ($errors->has('tags')) has-error @endif">
                <label for="task_name" class="control-label campaign__form-label">Tags <span>You can make multiple selections</span></label>

                <select id="tags" multiple="1" class="styled tags" style="width: 100%;" name="tags[]">
                    <optgroup label="Tags">

                        @foreach($tags as $tag)

                            <option value="{{ $tag->id }}">{{$tag->name}}</option>

                        @endforeach

                    </optgroup>
                </select>

                @if ($errors->has('tags')) <p class="help-block">{{ $errors->first('tags') }}</p> @endif
            </div>

            <div class="form-group @if ($errors->has('brands')) has-error @endif">
                <label for="task_name" class="control-label campaign__form-label">Brands <span>You can make multiple selections</span></label>

                <select id="brands" multiple="1" class="styled brands" style="width: 100%;" name="brands[]">
                    <optgroup label="Brands">

                        @foreach($brands as $brand)

                            <option value="{{ $brand->id }}">{{$brand->name}}</option>

                        @endforeach

                    </optgroup>
                </select>

                @if ($errors->has('brands')) <p class="help-block">{{ $errors->first('brands') }}</p> @endif
            </div>
        @endif

    </div>

    <div class="col-md-5">
        <label for="map" class="control-label">Map</label>
        <div id="location-map"></div>
    </div>
</div>

{!! Form::submit( $submitButtonText , array('type' => 'submit', 'class' => 'btn btn-primary', 'id' => 'submit_location')) !!}